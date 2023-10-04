import os
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from tqdm import tqdm
import argparse
import re

SAVE_TO = '/Users/janek/Documents/gpt_project/papers/'

def make_directory(save_path):
    if '.pdf' in save_path:
        save_path = '/'.join(save_path.split('/')[:-1])
    if not os.path.exists(save_path):
        os.mkdir(save_path)


def save_file(full_url, save_to):
    make_directory(save_to)
    with open(save_to, 'wb') as f:
        f.write(requests.get(full_url).content)


def get_set_of_hashes_downloaded(path):
    files = os.listdir(path)
    files = [f for f in files if '.pdf' in f]
    hashes = [file.split('-')[0] for file in files]
    return set(hashes)



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
    contents = soup.select("meta[name$='citation_title']")
    for content in contents:
        author = content['content']
        authors.append(author)
    return authors

def get_nips_publication_date(soup):
    content = soup.select("meta[name$='citation_publication_date']")[0]
    return content['content']

def saveJson(data, path):
    with open(path, 'w') as json_file:
        json.dump(data, json_file, indent=4)

def get_nips_papers(year):
    BASE = 'https://papers.nips.cc/'
    CONFERENCE = 'nips'
    nips_save_to = SAVE_TO + f'{CONFERENCE}/' + f'{year}/'
    downloaded_hashes = get_set_of_hashes_downloaded(nips_save_to)
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
    metadata_map = {}
    for link in paper_links[:10]:  # for each paper page retrive links to paper pdfs
        response2 = requests.get(BASE + link)
        soup2 = BeautifulSoup(response2.text, "html.parser")
        
        pdf_link = get_nips_pdf_link(soup2)
        title = get_nips_title(soup2)
        authors = get_nips_authors(soup2)
        abstract = get_nips_abstract(soup2)
        publication_date = get_nips_publication_date(soup2)
        
        metadata = {'conference': CONFERENCE,
                   'year': year,
                   'pdf': pdf_link,
                   'title': title,
                   'authors': authors,
                   'abstract': abstract,
                   'publication_date': publication_date,
                   'keywords': None}
        fname = title.lower().replace(' ', '_')
        save_file(pdf_link, nips_save_to + fname + '.pdf')
        metadata_map[fname] = metadata
    saveJson(metadata, nips_save_to + '/metadata.json')