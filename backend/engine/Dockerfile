# Use Python 3.11 slim as base image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Make port 8000 available to the world outside the container
EXPOSE 8000

# Run the application
CMD ["python", "app.py"]