''' 
Single API for connection to two services: 'Semantic&Search' and 'Q&A'
'''

from fastapi import FastAPI
from interfaces import Document

app = FastAPI()



@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}


### SEMANTIC SEARCH

@app.post("/app/search_query")
async def postSearchQuery():
    '''
    Body: (1) Search query text, (2) year filter, (3) conference filter
    Response: list of document_ids sorted in order of relevance
    Usage: When user sends search query we receive document_ids which then are used to populate results section.
    '''
    # vector_stores = getFaissVectoreStores()
    # faiss = combineFaissVectoreStores(vector_stores)  # temporarily just for single query then can be discarded.
    # 
    # document_ids = searchFaiss(faiss, body.query)
    return 

@app.get("/app/documents")
async def getDocuments():
    '''
    filter inputs: 
    - no filter: return all,
    - document_id: return single document
    - year: return all documents from a given year
    - conference: return all documents from a conference
    Output: returns Document object with all relevant info to display about a document 
    '''

@app.get("/app/years")
async def getYears():
    ''' simple helper endnode. Return all years in the database. '''
    return

@app.get("/app/conferences")
async def getConferences():
    ''' simple helper endnode. Return all conferences in the database. '''
    return 