from server.fastapi.app.interfaces import Document
from typing import List


def createFaiss(year: int = None, conference: str = None):
    '''
    create faiss vectore store for all documents in a subset of filter [year, conference]
    if these are not specified create faiss vectore store for all documents.
    '''
    documents: List[Document] = [None] # get request to /app/documents
    # 
    return

def createFaissAll():
    ''' creates all Faiss vector stores with createFaiss. '''
    years = None # get request to /app/years
    conferences = None #get request to /app/conferences
    for year in years:
        for conf in conferences:
             createFaiss(year=year,conference=conf)
    createFaiss()
    
def getEmbedding(text: str):
    ''' get vector embedding for a given text. Use HuggingFace '''
    # not sure if we need that or if this will be taken care of by Faiss vectore store
    return

def searchFaiss(faiss, text):
    ''' search for most relev ant documents. '''
    document_ids = [None]
    return document_ids
