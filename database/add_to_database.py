''' script for creating a database '''

import os
import config
import utils
import argparse
from typing import List
from interfaces import Document
from tqdm import tqdm
from supabase import create_client, Client
from supabase.lib.client_options import ClientOptions
from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())  # read local .env file


url: str = os.environ.get("DB_SUPABASE_URL")
key: str = os.environ.get("DB_SUPABASE_KEY")
supabase: Client = create_client(
    url, key, options=ClientOptions(schema=config.SCHEMA))


def writeToDatabase(document: Document) -> None:
    document_dict = document.__dict__
    try:
        data = supabase.table(config.TABLE).insert(document_dict).execute()
    except Exception as e:
        if hasattr(e, 'response') and hasattr(e.response, 'content'):
            print(e.response.content)
        else:
            print(f"An unexpected error occurred: {e}")


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Test argparse')
    parser.add_argument('--year', required=True, type=str,
                        help='year for which to download files')
    parser.add_argument('--conference', required=True, type=str,
                        help='conference for which to download files')
    args = parser.parse_args()

    DOC_PATH = config.SAVE_TO + f'{args.conference}/' + f'{args.year}/'
    METADATA_PATH = DOC_PATH + 'metadata.json'
    document_keys = utils.listDocuments(DOC_PATH)
    document_metadata = utils.readJson(METADATA_PATH)

    for key in tqdm(document_keys):
        name = key.split('.pdf')[0]
        title: str = document_metadata[name]['title']
        authors: List[str] = document_metadata[name]['authors']
        abstract: str = document_metadata[name]['abstract']
        pdf: str = document_metadata[name]['pdf']
        year: int = document_metadata[name]['year']
        conference: str = document_metadata[name]['conference']
        keywords: List[str] = document_metadata[name]['keywords']
        text: List[str] = document_metadata[name]['text']
        document = Document(title=title, authors=authors, abstract=abstract,
                            pdf=pdf, year=year, conference=conference, keywords=keywords, text=text)
        writeToDatabase(document)
