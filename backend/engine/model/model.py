import asyncio
import aiofiles
from typing import List
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import google.generativeai as genai
from langchain.schema import SystemMessage, HumanMessage
from dotenv import load_dotenv
from fpdf import FPDF
import base64
from datetime import datetime
import io

load_dotenv()

# Configure Google AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0.3,
    max_tokens=2048,
    timeout=None,
    max_retries=2,
)

# Define the system prompt for analysis
SYSTEM_PROMPT = """You are an expert in analyzing C files for security vulnerabilities.
Focus on identifying potential risks, malicious behaviors, and security issues in the code."""

class ReportPDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Malware Analysis Report', 0, 1, 'C')
        self.cell(0, 10, f'Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
        self.ln(10)
        
    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

class MalwareAnalyzer:
    def __init__(self):
        self.llm = llm
    
    async def read_file(self, file_path: str) -> str:
        """Safely read a file's contents."""
        if not os.path.exists(file_path):
            print(f"Warning: File not found: {file_path}")
            return f"[File not found: {file_path}]"
            
        try:
            async with aiofiles.open(file_path, mode="r") as f:
                return await f.read()
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")
            return f"[Error reading {file_path}: {str(e)}]"

    async def analyze_c_file(self, c_file_path: str) -> dict:
        """Analyze a single C file."""
        print(f"Processing C file: {c_file_path}")
        
        try:
            source_code = await self.read_file(c_file_path)
            
            analysis_prompt = f"""Analyze this C file for security risks:
                
C File ({c_file_path}):
{source_code}

Provide a detailed analysis of potential vulnerabilities and malicious behaviors."""
            
            messages = [
                SystemMessage(content=SYSTEM_PROMPT),
                HumanMessage(content=analysis_prompt)
            ]
            
            response = await asyncio.to_thread(self.llm.invoke, messages)
            
            return {
                "analysis": response.content,
                "filename": os.path.basename(c_file_path)
            }
            
        except Exception as e:
            print(f"Error analyzing file {c_file_path}: {e}")
            return {
                "analysis": f"Error analyzing {c_file_path}: {str(e)}",
                "filename": os.path.basename(c_file_path)
            }

    async def summarize_analyses(self, analyses: List[dict]) -> str:
        """Create a final summary of all analyses."""
        print("Generating final summary...")
        
        summary_content = "Individual File Analyses:\n\n"
        
        for analysis in analyses:
            summary_content += f"""File: {analysis['filename']}
================================================================================
{analysis['analysis']}
================================================================================

"""
        
        summary_prompt = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=summary_content + "\nProvide a detailed summary that highlights the most significant findings and overall assessment.")
        ]
        
        try:
            response = await asyncio.to_thread(self.llm.invoke, summary_prompt)
            return response.content
        except Exception as e:
            print(f"Error generating summary: {e}")
            return f"Error generating summary: {str(e)}"

    # def save_report(self, content: str, filename: str = "final_report.txt"):
    #     """Save the analysis report to a file."""
    #     try:
    #         with open(filename, "w") as f:
    #             f.write(content)
    #         print(f"Report saved successfully to {filename}")
    #     except Exception as e:
    #         print(f"Error saving report: {e}")

    def genarate_pdf(self,content:str):
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        # pdf.cell(200, 10, txt=content, ln=True, align='C')
        pdf.multi_cell(190, 10, txt=content)

        # Save PDF to a temporary file
        pdf_file_path = "temp.pdf"
        txt_file_path = "temp.txt"
        pdf.output(pdf_file_path)

        # Read and encode the PDF to Base64
        with open(pdf_file_path, "rb") as pdf_file:
            base64_encoded = base64.b64encode(pdf_file.read()).decode('utf-8')

        os.remove(pdf_file_path)
        # with open(txt_file_path, "w") as txt_file:
        #     txt_file.write(base64_encoded)

        return base64_encoded

    async def analyze_malware_files(self, c_files: List[str], output_dir: str = "output") -> None:
        """Main analysis workflow generating base64 output files."""
        try:
            # Create output directory if it doesn't exist
            os.makedirs(output_dir, exist_ok=True)
            
            # Analyze all C files concurrently
            analyses = await asyncio.gather(*[self.analyze_c_file(c_file) for c_file in c_files])
            
            # Generate final summary
            final_summary = await self.summarize_analyses(analyses)
            
            # Save the report
            b64_string = self.genarate_pdf(final_summary)

            return b64_string
            
        except Exception as e:
            print(f"Error in analysis workflow: {e}")
            return None

async def main():
    # Example C files to analyze
    c_files = [
        "c_files/exploit_copy_2.c",
        "c_files/exploit_copy.c"
    ]
    
    # Output directory for base64 files
    output_dir = "output"
    
    analyzer = MalwareAnalyzer()
    await analyzer.analyze_malware_files(c_files, output_dir)

if __name__ == "__main__":
    asyncio.run(main())