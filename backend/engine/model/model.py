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
import io

load_dotenv()

# Configure Google AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=2048,
    timeout=None,
    max_retries=2,
)

# Define the system prompt for analysis
SYSTEM_PROMPT = """You are an expert in analyzing C files for security vulnerabilities.
Focus on identifying potential risks, malicious behaviors, and security issues in the code."""

class MalwareAnalyzer:
    def __init__(self):
        self.llm = llm
    
    async def read_file(self, file_path: str) -> str:
        """Safely read a file's contents."""
        try:
            async with aiofiles.open(file_path, mode="r") as f:
                return await f.read()
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")
            return ""

    async def analyze_c_file(self, c_file_path: str, strings_data: str) -> str:
        """Analyze a single C file with associated strings data."""
        print(f"Processing C file: {c_file_path}")
        
        try:
            source_code = await self.read_file(c_file_path)
            
            analysis_prompt = f"""Analyze this C file and strings for security risks:
                
C File ({c_file_path}):
{source_code}

Extracted Strings:
{strings_data}

Provide a detailed analysis of potential vulnerabilities and malicious behaviors."""
            
            messages = [
                SystemMessage(content=SYSTEM_PROMPT),
                HumanMessage(content=analysis_prompt)
            ]
            
            response = await asyncio.to_thread(self.llm.invoke, messages)
            return response.content
            
        except Exception as e:
            print(f"Error analyzing file {c_file_path}: {e}")
            return f"Error analyzing {c_file_path}: {str(e)}"

    async def summarize_analyses(self, descriptions: List[str]) -> str:
        """Create a final summary of all analyses."""
        print("Generating final summary...")
        
        # Join descriptions with double newlines without using escape characters
        joined_descriptions = ""
        for i, desc in enumerate(descriptions):
            joined_descriptions += desc
            if i < len(descriptions) - 1:  # Don't add newlines after the last description
                joined_descriptions += "\n\n"
        
        summary_content = f"""Synthesize these individual file analyses into a comprehensive malware report:

Individual Analyses:
================================================================================
{joined_descriptions}
================================================================================

Provide a detailed summary that highlights the most significant findings and overall assessment."""
        
        summary_prompt = [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=summary_content)
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

    async def analyze_malware_files(self, c_files: List[str], strings_file: str):
        """Main analysis workflow."""
        try:
            # Read strings file
            strings_data = await self.read_file(strings_file)
            
            # Analyze all C files concurrently
            analysis_tasks = [
                self.analyze_c_file(c_file, strings_data)
                for c_file in c_files
            ]
            
            # Wait for all analyses to complete
            individual_analyses = await asyncio.gather(*analysis_tasks)
            
            # Generate final summary
            final_summary = await self.summarize_analyses(individual_analyses)
            
            # Save the report
            b64_string = self.genarate_pdf(final_summary)

            return b64_string
            
        except Exception as e:
            print(f"Error in analysis workflow: {e}")
            return f"Error in analysis workflow: {str(e)}"

async def main():
    c_files = ["c_files/exploit_copy_2.c", "c_files/exploit_copy.c"]
    strings_file = "strings/strings_exploit.txt"
    
    analyzer = MalwareAnalyzer()
    await analyzer.analyze_malware_files(c_files, strings_file)

if __name__ == "__main__":
    asyncio.run(main())