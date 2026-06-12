from sqlalchemy import Column, Integer, String, Text
from app.database.db import Base


class ResearchPaper(Base):
    __tablename__ = "research_papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    authors = Column(Text)
    abstract = Column(Text)
    published = Column(String)
    pdf_url = Column(String)
    full_text = Column(Text)
