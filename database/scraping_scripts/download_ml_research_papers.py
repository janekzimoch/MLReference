import os
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from tqdm import tqdm
import argparse

SAVE_TO = '/Users/janek/Documents/gpt_project/papers/'
YEARS_OF_INTEREST = np.arange(2010, 2023, 1).tolist()
CONFERENCES = ['nips', 'icml', 'iclr']


def make_directory(save_path):
    if '.pdf' in save_path:
        save_path = '/'.join(save_path.split('/')[:-1])
    if not os.path.exists(save_path):
        os.mkdir(save_path)


def save_file(full_url, save_to):
    with open(save_to, 'wb') as f:
        f.write(requests.get(full_url).content)


def get_set_of_hashes_downloaded(path, conference):
    files = os.listdir(path)
    files = [f for f in files if '.pdf' in f]
    if conference == 'nips':
        hashes = [file.split('-')[0] for file in files]
    if conference == 'icml':
        hashes = [file for file in files]
    return set(hashes)


def get_nips_papers(year):
    BASE = 'https://papers.nips.cc/'
    CONFERENCE = 'nips'
    save_to = SAVE_TO + f'{CONFERENCE}/' + f'{year}/'
    make_directory(save_to)
    downloaded_hashes = get_set_of_hashes_downloaded(save_to, CONFERENCE)
    print(
        f'Num files already downlaoded for {CONFERENCE}-{year}: ', len(downloaded_hashes))

    # parse html
    # for each year retrive list of links to paper pages
    response = requests.get(BASE + f'paper_files/paper/{year}')
    soup = BeautifulSoup(response.text, "html.parser")
    # 'paper title' is NIPS specific
    paper_links = soup.findAll("a", {'title': 'paper title'})
    paper_links = [link['href'] for link in paper_links]
    paper_links = [
        link for link in paper_links if link.split('/')[-1].split('-')[0] not in downloaded_hashes]
    print(
        f'Num files to be downlaoded: ', len(paper_links))
    for link in paper_links:  # for each paper page retrive links to paper pdfs
        response2 = requests.get(BASE + link)
        soup2 = BeautifulSoup(response2.text, "html.parser")
        # 'Paper-Conference' is NIPS specific
        pdf_links = soup2.select("a[href$='.pdf']")
        pdf_links = [l for l in pdf_links if 'Paper' in l]
        for pdf_link in pdf_links:
            # we expect to see only one pdf file thus [0]
            pdf_link_href = pdf_link['href']
            link_to_download = urljoin(BASE, pdf_link_href)

            # download
            fname = link_to_download.split('/')[-1]
            save_file(link_to_download, save_to + fname)
            print(f'downloaded: {link_to_download}')


def get_icml_papers(year):
    BASE = 'https://icml.cc/'
    CONFERENCE = 'icml'
    save_to = SAVE_TO + f'{CONFERENCE}/' + f'{year}/'
    make_directory(save_to)
    downloaded_hashes = get_set_of_hashes_downloaded(save_to, CONFERENCE)

    # parse html
    # for each year retrive list of links to paper pages
    response = requests.get(BASE + f'virtual/{year}/papers.html?filter=titles')
    soup = BeautifulSoup(response.text, "html.parser")
    soup2 = soup.findAll("a")
    paper_links = [s['href'] for s in soup2 if (
        '/').join(s['href'].split('/')[:-1]) == f'/virtual/{year}/poster']
    for link in paper_links:  # for each paper page retrive links to paper pdfs
        response2 = requests.get(BASE + link)
        soup2 = BeautifulSoup(response2.text, "html.parser")
        if year == 2022:
            soup2 = soup2.findAll("a", {'title': 'Paper PDF'})
        else:  # year 2021
            soup2 = soup2.findAll("a", {'class': 'paper-pdf-link'})
        link = soup2[0]['href']
        response3 = requests.get(link)
        soup3 = BeautifulSoup(response3.text, "html.parser")
        pdf_links = soup3.select("a[href$='.pdf']")

        for pdf_link in pdf_links:
            # we expect to see only one pdf file thus [0]
            link_to_download = pdf_link['href']
            if 'supp' in link_to_download:
                continue

            # download
            fname = link_to_download.split('/')[-1]
            if fname in downloaded_hashes:
                print(fname)
                continue
            save_file(link_to_download, save_to + fname)
            print(f'downloaded: {link_to_download}')


def get_iclr_papers():
    return


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Test argparse')
    parser.add_argument('--years', nargs='+', required=True, type=str,
                        help='years for which to download files')
    parser.add_argument('--conference', required=True, type=str,
                        help='conference for which to download files')

    args = parser.parse_args()
    for year in args.years:
        year = int(year)

        if year not in YEARS_OF_INTEREST:
            raise ValueError(
                f"{year} is a wrong Year. These are allowed years: {YEARS_OF_INTEREST}")

        if args.conference == 'nips':
            get_nips_papers(year)
        elif args.conference == 'icml':
            get_icml_papers(year)
        elif args.conference == 'iclr':
            get_iclr_papers(year)
        else:
            raise ValueError(f"These are allowed conferences: {CONFERENCES}")
