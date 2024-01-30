from dataclasses import dataclass
from typing import List


@dataclass
class Document:
    id: int
    title: str
    authors: List[str]
    abstract: str
    pdf: str
    year: int
    conference: str
    keywords: List[str]  # may make sense to restrict keywords to some set
