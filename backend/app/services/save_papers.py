from app.database.db import SessionLocal
from app.models.paper_model import ResearchPaper
from app.scraping.arxiv_scraper import fetch_papers

# Create a new DB session
db = SessionLocal()

# Fetch papers from arXiv
papers = fetch_papers()

# Insert each paper into the database
for paper in papers:
    new_paper = ResearchPaper(
        title=paper["title"],
        abstract=paper["abstract"],
        published=paper["published"]
    )
    db.add(new_paper)

# Commit the transaction
db.commit()

print("Papers saved successfully")
