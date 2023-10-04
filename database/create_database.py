''' script for creating a database '''

import os
import config
import utils
from typing import List
from interfaces import Document
from supabase import create_client, Client

url: str = os.environ.get("DB_SUPABASE_URL")
key: str = os.environ.get("DB_SUPABASE_KEY")
supabase: Client = create_client(url, key)



def writeToDatabase(document: Document) -> None:
    document_dict = document.__dict__
    data = supabase.table(config.TABLE_NAME).insert(document_dict).execute()



if __name__ == 'main':
    documents_paths = utils.listDocuments(config.DOCUMENT_PATH)
    # during scraping we have been stroing metadata of the documents in a json list
    document_metadata = utils.readJson(config.DOCUMENT_METADATA_PATH)
    for path in documents_paths:
        # TODO - we don't know how to access those variables.
        title: str = None
        authors: List[str] = None
        abstract: str = None
        arxiv: str = None
        year: int = None
        conference: str = None
        keywords: List[str] = None
        document = Document(title=title, authors=authors, abstract=abstract, arxiv=arxiv, year=year, conference=conference, keywords=keywords)
        writeToDatabase(document)

