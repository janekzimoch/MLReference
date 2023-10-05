import os
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np
from tqdm import tqdm
import argparse

import utils
import config
import conferences.nips as nips
import conferences.iclr as iclr
import conferences.icml as icml

YEARS_OF_INTEREST = np.arange(2010, 2023, 1).tolist()
CONFERENCES = ['nips', 'icml', 'iclr']


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
            nips.get_nips_papers(year)
        elif args.conference == 'icml':
            icml.get_icml_papers(year)
        elif args.conference == 'iclr':
            iclr.get_iclr_papers(year)
        else:
            raise ValueError(f"These are allowed conferences: {CONFERENCES}")
