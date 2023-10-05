'''
utility functions for creatinf an entry to our database
'''

import json
import os
import requests
import json
from typing import List
from pathlib import Path



def listDocuments(path: str) -> List[str]:
    ''' list paths to all .pdf documents in a directory '''
    files = os.listdir(path)
    document_names = [f for f in files if '.pdf' in f]
    return document_names

def extractAbstract() -> str:
    '''
    Extract abstract from the text
    '''
    abstract = None
    return abstract

def extractKeywords(full_text: str) -> List[str]:
    ''' Extract keywords from the article. '''
    # priority - low
    # TBD - decide how to do that. Should there be some clasification model? should you use chatGPT?
    keywords = []
    return keywords

def make_directory(save_path):
    if '.pdf' in save_path:
        save_path = '/'.join(save_path.split('/')[:-1])
    Path(save_path).mkdir(parents=True, exist_ok=True)


def save_file(full_url, save_to):
    make_directory(save_to)
    with open(save_to, 'wb') as f:
        f.write(requests.get(full_url).content)


def get_set_of_hashes_downloaded(path):
    files = os.listdir(path)
    files = [f for f in files if '.pdf' in f]
    hashes = [file.split('-')[0] for file in files]
    return set(hashes)

def saveJson(path, data):
    with open(path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def readJson(path):
    try:
        with open(path, 'r') as json_file:
            existing_data = json.load(json_file)
    except FileNotFoundError:
        existing_data = {}
    return existing_data

def updateJson(path, new_data):
    existing_data = readJson(path)
    existing_data.update(new_data)
    saveJson(path, existing_data)
