from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from llama_index.embeddings import HuggingFaceEmbedding

import evaluation.evaluate as evaluator 
from embedding_store import EmbeddingStore


if __name__ == '__main__':

    dataset = evaluator.load_dataset()
    test_text = dataset['Corpus'][0]['original_abstract']

    LI_embedding_model = HuggingFaceEmbedding(model_name="BAAI/bge-base-en-v1.5")
    LI_embed = LI_embedding_model._embed([test_text])[0]

    embed_model = HuggingFaceBgeEmbeddings(model_name="BAAI/bge-base-en-v1.5")
    LC_embed = embed_model.embed_documents([test_text])[0]

    print('llama_index: ', LI_embed[:5])
    print('langchain: ', LC_embed[:5])