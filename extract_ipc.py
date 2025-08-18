from docling.document_converter import DocumentConverter
import os

# Use a relative or absolute path
source = "data/ipc.pdf"  

# Debug: check path
print("Looking for:", os.path.abspath(source))
print("Exists?", os.path.exists(source))

# Initialize Docling
converter = DocumentConverter()

# Convert
result = converter.convert(source)

# Export to Markdown
print(result.document.export_to_markdown())

# Optionally save as JSON
with open("ipc_data.json", "w", encoding="utf-8") as f:
    f.write(result.document.export_to_json())
