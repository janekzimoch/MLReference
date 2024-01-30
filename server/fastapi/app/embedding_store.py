import os
import sys
import json
import gc
from dotenv import load_dotenv
load_dotenv()
import torch 

from langchain.vectorstores.faiss import FAISS
from tqdm import tqdm
# from langchain.embeddings import HuggingFaceEmbeddings
from llama_index.embeddings import HuggingFaceEmbedding

from interfaces import Document, Recommendation
from parsing.parserPDF import ParserPDF
import miscelanous.data_formater as formater
import miscelanous.utils as utils





class EmbeddingStore():

    def __init__(self, model_name="BAAI/bge-base-en-v1.5", data = None, vector_store_path=None, batch_size=32):
        self.embedding_model = HuggingFaceEmbedding(
            model_name=model_name,
            )
        self.model_name = model_name.split('/')[1]
        print('Embedder device: ', self.embedding_model._device)
        self.batch_size = batch_size
        self.vector_store = self._initialise_vectore_store(data, vector_store_path)
        print('Setup finished!')

    def _initialise_vectore_store(self, data, vector_store_path):
        if vector_store_path is not None:
            vector_store = FAISS.load_local(vector_store_path, self.embedding_model)
            return vector_store
        else:
            
            if data is None:
                # load default data
                documents_dir = os.environ.get('PDF_ARTICLES_DIR')
                metadata_path = os.environ.get('PDF_ARTICLES_METADATA_DIR')
                parser = ParserPDF(metadata_path)
                docs = parser.extract_directory(documents_dir)
            else:
                # we assume data is from DORIS_MAE daatset
                docs: list[Document] = formater.convert_DORIS_MAE_to_my_format(data)

            # initialise vectore store
            print('preparing vectorstore...')
            torch.cuda.empty_cache()
            embeddings_save_dir = f'/home/zimochpamela/data/mlreference/embeddings_{self.model_name}.csv'
            utils.remove_file_if_exists(embeddings_save_dir)

            texts, metadata = self._prepare_documents_for_faiss(docs)
            self.embed_batch(texts, embeddings_save_dir)
            embeddings = utils.load_data_csv(embeddings_save_dir)

            text_embedding_pairs = list(zip(texts, embeddings))
            vector_store = FAISS.from_embeddings(
                text_embedding_pairs, self.embedding_model, metadatas=metadata)
            
            faiss_save_dir = os.environ.get('FAISS_SAVE_DIR') + f'/{self.model_name}'
            utils.make_directory(faiss_save_dir)
            vector_store.save_local(faiss_save_dir)
            return vector_store

    def _prepare_documents_for_faiss(self, docs: list[Document]):
        ''' each Document is divided into chunks. We need to seperate each chunk into a seperate element of a list to prepare this as an input to FAISS. '''
        text_list = []
        metadata_list = []
        for doc in docs:
            metadata = {'authors': doc['authors'],
                        'conference': doc['conference'],
                        'year': doc['year'],
                        'abstract': doc['abstract'],
                        'pdf': doc['pdf'],
                        'title': doc['title']}
            for text in doc['text']:
                text_list.append(text)
                metadata_list.append(metadata)
        return text_list, metadata_list

    def article_recommendations(self, query: str, K: int = 5) -> list[Recommendation]:
        most_similar = self._get_most_similar(query, K)
        recommendations = []
        for document, score in most_similar:
            relevance_description = self._explain_relevance(query, document)
            recommendation: Recommendation = {'page_content': document.page_content,
                                              'metadata': document.metadata, 'score': score, 'relevance_description': relevance_description}
            recommendations.append(recommendation)
        return recommendations

    def embed_batch(self, texts: list[str], save_dir) ->  list[list[float]]:
        embeddings = []
        N = len(texts)
        save_batch_id = 1

        for i in tqdm(range(0, N, self.batch_size)):
            st_ind = i
            ed_ind = min(i + self.batch_size, N)
            embeddings_batch = self.embedding_model._embed(texts[st_ind:ed_ind])
            embeddings.extend(embeddings_batch)
            
            # save every 10k samples 
            if i // 5000 == save_batch_id:
                utils.save_data_csv(save_dir, embeddings)
                embeddings = []
                save_batch_id += 1
                gc.collect()
                torch.cuda.empty_cache()
            
        # final save
        utils.save_data_csv(save_dir, embeddings)

    def embed(self, text: str) -> list[float]:
        ''' embed text into an embedding '''
        embedding = self.embedding_model._embed([text])[0]
        return embedding

    def _get_most_similar(self, query: str, K: int = 5) -> list[Document]:
        docsearch = FAISS.load_local(os.environ.get(
            'FAISS_SAVE_DIR'), self.embedding_model)
        docs_with_score = docsearch.similarity_search_with_score(query, k=K)
        return docs_with_score

    def _explain_relevance(self, text: str, document: Document) -> str:
        # abstarct is passed to _explain_relevance - as a minimal and short represenation of a document. To Be Improved Later
        return ''


if __name__ == "__main__":

    es = EmbeddingStore()
    query = "I am trying to  build a RAG system, what LLM literature should I read?"
    recommendations = es.article_recommendations(query)
    for rec in recommendations:
        print(rec['score'], rec['metadata']['title'])
