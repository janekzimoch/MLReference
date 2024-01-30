from interfaces import Document
from typing import List, Dict
import requests
import asyncio
import fitz

SERVER_HOST = 'http://0.0.0.0:5434'


def getMetadata(documents):
    texts = [doc['content'] for doc in documents]
    metadata = [{'authors': doc['authors'],
                 'conference': doc['conference'],
                 'year': doc['year'],
                 'abstract': doc['abstract'],
                 'pdf': doc['pdf'],
                 'title': doc['title']}
                for doc in documents]
    return texts, metadata


def getPdfPages(doc) -> Dict[int, str]:
    ''' returns dict: page: text_on_that_page  '''
    N = len(doc)
    doc_pages = {}
    for n in range(N):
        page = doc[n]
        words = page.get_text("words")
        words = [element[4] for element in words]
        page_text = ' '.join(words)
        doc_pages[n] = page_text
    return doc_pages


def extractTextFromPDF(pdf):
    doc = fitz.open(pdf)
    pages_text = getPdfPages(doc)


def createFaiss(year: int = None, conference: str = None):
    '''
    create faiss vectore store for all documents in a subset of filter [year, conference]
    if these are not specified create faiss vectore store for all documents.
    '''
    # given year and conference -> get all documents in our database meeting the criteria
    # Q: Should text extraction happen while building Faiss? or should it happen when uploading documents to the database?
    # we could store extracted text in the database, and then never have to process those documents again

    response = requests.get(
        SERVER_HOST + f'/app/documents?year={year}&conference={conference}').json()
    documents = [Document(**doc) for doc in response['data']]
    texts, metadata = get_metadata(documents)
    # docsearch = FAISS.from_embeddings(
    #     text_embedding_pairs, embedding_model, metadatas=metadata)
    # docs_with_score = docsearch.similarity_search_with_score(query, k=K)
    return


def createFaissAll():
    ''' creates all Faiss vector stores with createFaiss. '''
    years = None  # get request to /app/years
    conferences = None  # get request to /app/conferences
    for year in years:
        for conf in conferences:
            createFaiss(year=year, conference=conf)
    createFaiss()


def getEmbedding(text: str):
    ''' get vector embedding for a given text. Use HuggingFace '''
    # not sure if we need that or if this will be taken care of by Faiss vectore store
    return


def searchFaiss(faiss, text):
    ''' search for most relev ant documents. '''
    document_ids = [None]
    return document_ids


createFaiss(year=2022, conference='nips')
# asyncio.run()
