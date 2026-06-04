from app.database.db import engine
from app.models.paper_model import ResearchPaper, Base

Base.metadata.create_all(bind=engine)

print("Tables created successfully")
