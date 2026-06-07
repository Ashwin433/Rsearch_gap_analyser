from app.database.db import SessionLocal
from app.models.paper_model import ResearchPaper
from app.embeddings.embedder import generate_embedding
from app.embeddings.chroma_store import collection


def main():
    # Create a DB session
    db = SessionLocal()
    # Retrieve all papers saved in the database
    papers = db.query(ResearchPaper).all()
    db.close()

    for paper in papers:
        # Generate an embedding for the abstract (you could also embed title+abstract)
        embedding = generate_embedding(str(paper.abstract))

        # Store the embedding, original abstract, and some metadata in Chroma
        collection.add(
            ids=[str(paper.id)],
            embeddings=[embedding],
            documents=[str(paper.abstract)],
            metadatas=[{"title": str(paper.title), "published": str(paper.published)}],
        )

    print("Embeddings Stored Successfully")


if __name__ == "__main__":
    main()
