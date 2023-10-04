'''
utility functions for creatinf an entry to our database
'''

from typing import List
import json


def readJson(path):
    with open(path, 'r') as file:
        data = json.load(file)
    return data

def listDocuments(directory: str) -> List[str]:
    ''' list paths to all .pdf documents in a directory '''
    document_paths = []
    return document_paths

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
