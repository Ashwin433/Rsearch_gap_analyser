# type: ignore
import requests
import xml.etree.ElementTree as ET

ARXIV_URL = "http://export.arxiv.org/api/query?"

def fetch_papers(query="artificial intelligence", max_results=5):
    """Fetch papers from arXiv.

    Args:
        query (str): Search term for arXiv.
        max_results (int): Number of results to return.

    Returns:
        list[dict]: List of paper metadata dictionaries with title, abstract, and published date.
    """
    url = f"{ARXIV_URL}search_query=all:{query}&start=0&max_results={max_results}"
    response = requests.get(url)
    response.raise_for_status()
    root = ET.fromstring(response.content)
    papers = []
    for entry in root.findall('{http://www.w3.org/2005/Atom}entry'):
        title_elem = entry.find('{http://www.w3.org/2005/Atom}title')
        title = title_elem.text.strip() if title_elem is not None and title_elem.text else ''
        abstract_elem = entry.find('{http://www.w3.org/2005/Atom}summary')
        abstract = abstract_elem.text.strip() if abstract_elem is not None and abstract_elem.text else ''
        published_elem = entry.find('{http://www.w3.org/2005/Atom}published')
        published = published_elem.text.strip() if published_elem is not None and published_elem.text else ''
        papers.append({"title": title, "abstract": abstract, "published": published})
    return papers
