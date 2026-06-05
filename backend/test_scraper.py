from app.scraping.arxiv_scraper import fetch_papers

papers = fetch_papers()

for paper in papers:
    print(paper)
