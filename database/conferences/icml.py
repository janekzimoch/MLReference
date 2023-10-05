import requests
from bs4 import BeautifulSoup

import utils
import config



def get_icml_papers(year):
    BASE = 'https://icml.cc/'
    CONFERENCE = 'icml'
    save_to = config.SAVE_TO + f'{CONFERENCE}/' + f'{year}/'
    utils.make_directory(save_to)
    downloaded_hashes = utils.get_set_of_hashes_downloaded(save_to, CONFERENCE)

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
            utils.save_file(link_to_download, save_to + fname)
            print(f'downloaded: {link_to_download}')