from docling.document_converter import DocumentConverter
from pathlib import Path
import json

# Initialize Docling
converter = DocumentConverter()

# PDF path
input_pdf = Path("data/ipc.pdf")  # relative path inside repo

# Convert PDF
doc = converter.convert(input_pdf)

# Export structured data
doc_dict = doc.export_to_dict()

# Save as JSON in repo
output_json = Path("data/ipc_sections.json")

with open(output_json, "w", encoding="utf-8") as f:
    json.dump(doc_dict, f, ensure_ascii=False, indent=4)

print(f"Data extracted and saved to {output_json}")
