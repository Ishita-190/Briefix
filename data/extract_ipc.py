from docling.document_converter import DocumentConverter

# PDF file path
pdf_path = "ipc.pdf"
output_path = "ipc_data.json"

# Convert PDF → structured data
converter = DocumentConverter()
result = converter.convert(pdf_path)

# Save JSON
with open(output_path, "w", encoding="utf-8") as f:
    f.write(result.to_json())

print(f"✅ Extracted data saved to {output_path}")
