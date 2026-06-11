import requests
import os

def download_pdf(url: str, filename: str) -> None:
    """Download a research paper PDF from the given URL and save it locally.

    Args:
        url (str): The URL of the PDF.
        filename (str): The name to save the PDF as (without extension).
    """
    response = requests.get(url)
    response.raise_for_status()

    # Create the 'papers' directory if it doesn't exist
    os.makedirs("papers", exist_ok=True)

    file_path = f"papers/{filename}.pdf"
    with open(file_path, "wb") as f:
        f.write(response.content)
