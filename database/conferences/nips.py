import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from tqdm import tqdm

import utils
import config



def get_nips_pdf_link(soup):
    content = soup.select("meta[name$='citation_pdf_url']")[0]
    return content['content']

def get_nips_title(soup):
    content = soup.select("meta[name$='citation_title']")[0]
    return content['content']

def get_nips_abstract(soup):
    text = soup.find('h4', text='Abstract').find_next('p').get_text()
    return text

def get_nips_authors(soup):
    authors = []
    contents = soup.select("meta[name$='citation_author']")
    for content in contents:
        author = content['content']
        authors.append(author)
    return authors

def get_nips_publication_date(soup):
    content = soup.select("meta[name$='citation_publication_date']")[0]
    return content['content']

def get_nips_papers(year):
    BASE = 'https://papers.nips.cc/'
    CONFERENCE = 'nips'
    nips_save_to = config.SAVE_TO + f'{CONFERENCE}/' + f'{year}/'
    utils.make_directory(nips_save_to)
    downloaded_hashes = utils.get_set_of_hashes_downloaded(nips_save_to)
    print(
        f'Num files already downlaoded for {CONFERENCE}-{year}: ', len(downloaded_hashes))
    response = requests.get(BASE + f'paper_files/paper/{year}')
    soup = BeautifulSoup(response.text, "html.parser")
    # 'paper title' is NIPS specific
    paper_links = soup.findAll("a", {'title': 'paper title'})
    paper_links = [link['href'] for link in paper_links]
    paper_links = [
        link for link in paper_links if link.split('/')[-1].split('-')[0] not in downloaded_hashes]
    print(
        f'Num files to be downlaoded: ', len(paper_links))

    for link in tqdm(paper_links[:100]):  # for each paper page retrive links to paper pdfs
        response2 = requests.get(BASE + link)
        soup2 = BeautifulSoup(response2.text, "html.parser")
        
        pdf_link = get_nips_pdf_link(soup2)
        title = get_nips_title(soup2)
        authors = get_nips_authors(soup2)
        abstract = get_nips_abstract(soup2)
        publication_date = get_nips_publication_date(soup2)
        
        fname = title.lower().replace(' ', '_')
        metadata = {fname: 
                    {'conference': CONFERENCE,
                    'year': year,
                    'pdf': pdf_link,
                    'title': title,
                    'authors': authors,
                    'abstract': abstract,
                    'publication_date': publication_date,
                    'keywords': None}
                   }
        utils.save_file(pdf_link, nips_save_to + fname + '.pdf')
        utils.updateJson(nips_save_to + '/metadata.json', metadata)
