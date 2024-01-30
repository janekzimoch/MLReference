''' 
Single API for connection to two services: 'Semantic&Search' and 'Q&A'
'''
# from langchain.embeddings import HuggingFaceEmbeddings
# from langchain.vectorstores.faiss import FAISS
import os
from typing import Optional
from fastapi import FastAPI
from sqlalchemy import text
from interfaces import Document
import db_connection as db
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())  # read local .env file

# embedding_model = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-mpnet-base-v2")


sql_engine = db.setupSQL()
supabase = db.setupClient()
app = FastAPI()


@app.get("/hello")
async def get_hello():
    return {"message": "FastAPI server works"}


# SEMANTIC SEARCH


# how to add two FAISS vector stores

@app.post("/app/search_query")
async def postSearchQuery():
    '''
    Body: (1) Search query text, (2) year filter, (3) conference filter
    Response: list of document_ids sorted in order of relevance
    Usage: When user sends search query we receive document_ids which then are used to populate results section.
    '''

    # vector_stores = getFaissVectoreStores()  # loads appropraite vecotr stores
    # faiss = combineFaissVectoreStores(vector_stores)  # temporarily just for single query then can be discarded.
    #
    # document_ids = searchFaiss(faiss, body.query)

    # texts, metadata = get_metadata(text_objects)
    # docsearch = FAISS.from_embeddings(
    #     text_embedding_pairs, embedding_model, metadatas=metadata)
    # docs_with_score = docsearch.similarity_search_with_score(query, k=K)

    return


@app.get("/app/documents")
async def getDocuments(
        document_id: Optional[int] = None,
        year: Optional[int] = None,
        conference: Optional[str] = None):
    '''
    filter inputs: 
    - no filter: return all,
    - document_id: return single document
    - year: return all documents from a given year
    - conference: return all documents from a conference
    Output: returns Document object with all relevant info to display about a document 
    '''
    if document_id is not None:
        documents = supabase.table(os.environ["DB_TABLE"]).select(
            '*').eq("id", document_id).execute()
    elif year is not None and conference is not None:
        documents = supabase.table(os.environ["DB_TABLE"]).select(
            '*').eq("year", year).eq("conference", conference).execute()
    elif year is not None:
        documents = supabase.table(os.environ["DB_TABLE"]).select(
            '*').eq("year", year).execute()
    elif conference is not None:
        documents = supabase.table(os.environ["DB_TABLE"]).select(
            '*').eq("conference", conference).execute()
    else:
        documents = supabase.table(
            os.environ["DB_TABLE"]).select('*').execute()
    return documents


@app.get("/app/years")
async def getYears():
    ''' simple helper endnode. Return all years in the database. '''
    connection = sql_engine.connect()
    query = text("SELECT DISTINCT(year) FROM documents")
    response = connection.execute(query)
    years = list([i for i in response][0])
    connection.close()
    return years


@app.get("/app/conferences")
async def getConferences():
    ''' simple helper endnode. Return all conferences in the database. '''
    connection = sql_engine.connect()
    query = text("SELECT DISTINCT(conference) FROM documents")
    response = connection.execute(query)
    conferences = list([i for i in response][0])
    connection.close()
    return conferences
