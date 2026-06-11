import fitz

def extract_text(pdf_path: str) -> str:
    """Extract raw text from all pages of a PDF file using PyMuPDF.

    Args:
        pdf_path (str): The local path to the PDF file.

    Returns:
        str: The extracted text.
    """
    text = ""
    doc = fitz.open(pdf_path)
    for page in doc:
        page_text = page.get_text()
        if isinstance(page_text, str):
            text += page_text
    return text
