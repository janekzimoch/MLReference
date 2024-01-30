from interfaces import Document
from typing import List, Dict
from tqdm import tqdm
import argparse
import fitz
import utils
import config


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


def extractTextFromPDF(pdf) -> List[str]:
    doc = fitz.open(pdf)
    pages_text = getPdfPages(doc)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Test argparse')
    parser.add_argument('--year', required=True, type=str,
                        help='year for which to download files')
    parser.add_argument('--conference', required=True, type=str,
                        help='conference for which to download files')
    args = parser.parse_args()

    # load metadata.json
    DOC_PATH = config.SAVE_TO + f'{args.conference}/' + f'{args.year}/'
    METADATA_PATH = DOC_PATH + 'metadata.json'
    document_keys = utils.listDocuments(DOC_PATH)
    document_metadata = utils.readJson(METADATA_PATH)

    for key in tqdm(document_keys):
        text: List[str] = extractTextFromPDF(DOC_PATH + key)  # extract text
        name = key.split('.pdf')[0]
        # set text as one of the keys in metadata
        document_metadata[name]['text'] = text
    # update the json dictionary, by overwritting it
    utils.saveJson(METADATA_PATH, document_metadata)
