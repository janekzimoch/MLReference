''' 
Single API for connection to two services: 'Semantic&Search' and 'Q&A'
'''
import os
from fastapi import FastAPI
from sqlalchemy import text
from interfaces import Document
import db_connection as db


sql_engine = db.setupSQL()
supabase = db.setupClient()
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


@db.withSQLConnection(sql_engine)
@app.get("/app/years")
async def getYears(connection):
    ''' simple helper endnode. Return all years in the database. '''
    query = text("SELECT DISTINCT(year) FROM documents")
    response = connection.execute(query)
    years = [i for i in response][0]
    return years


@db.withSQLConnection(sql_engine)
@app.get("/app/conferences")
async def getConferences(connection):
    ''' simple helper endnode. Return all conferences in the database. '''
    query = text("SELECT DISTINCT(conference) FROM documents")
    response = connection.execute(query)
    conferences = [i for i in response][0]
    return conferences

years = getYears()
print(years)