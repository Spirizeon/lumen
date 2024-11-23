import base64

def base64_to_pdf(base64_string, output_file_path):
    # Decode the Base64 string
    pdf_data = base64.b64decode(base64_string)

    # Save to a PDF file
    with open(output_file_path, "wb") as pdf_file:
        pdf_file.write(pdf_data)

    return output_file_path

# Example usage
with open("temp.txt", "r") as f:
    base64_content = f.read()

base64_to_pdf(base64_content, "output.pdf")
