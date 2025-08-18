from docling.document_converter import DocumentConverter
from pathlib import Path
import json

# Initialize Docling converter
converter = DocumentConverter()

# Path to your IPC PDF
input_pdf = Path("IPC.pdf")

# Convert PDF into a structured Docling object
doc = converter.convert(input_pdf)

# Export as a dictionary
doc_dict = doc.export_to_dict()

# Save to JSON
output_json = Path("ipc_data.json")
with open(output_json, "w", encoding="utf-8") as f:
    json.dump(doc_dict, f, ensure_ascii=False, indent=4)

print(f"IPC data extracted and saved to {output_json}")
