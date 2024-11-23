from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import asyncio
import aiofiles
from typing import List
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import google.generativeai as genai
import getpass
from langchain.schema import SystemMessage
from langchain.schema import HumanMessage

# Set up the Google API Key
if "GOOGLE_API_KEY" not in os.environ:
    os.environ["GOOGLE_API_KEY"] = getpass.getpass("Enter your Google AI API key: ")

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=2048,
    timeout=None,
    max_retries=2,
)

# Define prompt templates
file_analysis_prompt = ChatPromptTemplate.from_template(
    "Analyze the following C file combined with the provided strings for potential vulnerabilities or malicious behavior:\n"
    "C File Content:\n{code}\n\nStrings:\n{strings}"
)

final_summary_prompt = ChatPromptTemplate.from_template(
    "Combine and summarize the following analysis results into a cohesive description of the malware:\n{descriptions}"
)

# Analyze a C file and associated strings
async def analyze_c_file_with_system_prompt(c_file_path: str, strings_data: str) -> str:
    print(f"Processing C file: {c_file_path}")
    async with aiofiles.open(c_file_path, mode="r") as f:
        source_code = await f.read()

    generate_prompt = f"""
            You are an expert in analyzing C files for security vulnerabilities.
            Analyze the following C file along with the provided strings for potential risks:
            C File Content:\n{source_code}\n\nStrings:\n{strings_data}
        """
    
    # Use llm.chat() if invoke is not working
    response = await llm.invoke([HumanMessage(content=generate_prompt)])
    return response.generations[0].text  # Adjust based on response structure

# Summarize multiple descriptions into one
async def summarize_descriptions(descriptions: List[str]) -> str:
    print("Summarizing all file descriptions...")
    
    formatted_prompt = final_summary_prompt.format_messages({"descriptions": "\n\n".join(descriptions)})
    
    # Adjusted to llm.invoke()
    response = await llm.invoke([formatted_prompt])
    return response.generations[0].text  # Adjust based on response structure

# Main analysis workflow
async def analyze_malware_with_strings(c_files: List[str], strings_file_path: str):
    async with aiofiles.open(strings_file_path, mode="r") as f:
        strings_data = await f.read()

    # Analyze each C file in parallel
    tasks = [analyze_c_file_with_system_prompt(c_file, strings_data) for c_file in c_files]
    descriptions = await asyncio.gather(*tasks)

    # Summarize into a final report
    final_description = await summarize_descriptions(descriptions)
    generate_final_report(final_description)

# Save the final report
def generate_final_report(final_description: str):
    print("Generating final report...")
    with open("final_report.txt", "w") as f:
        f.write(final_description)
    print("Final report saved as final_report.txt")

# Main function
if __name__ == "__main__":
    c_files = ["c_files/exploit_copy_2.c", "c_files/exploit_copy.c"]
    strings_file = "strings_exploit.txt"
    asyncio.run(analyze_malware_with_strings(c_files, strings_file))
