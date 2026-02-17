#!/bin/bash

# Simple script to run the backend on a server (Linux/Ubuntu)
# Prerequisites: Java 17 and Maven must be installed.

echo "========================================"
echo "Starting Exim Royals Backend on Server"
echo "========================================"

# Check for Java
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed. Please install Java 17."
    exit 1
fi

# Check for Maven
if ! command -v mvn &> /dev/null; then
    echo "Error: Maven is not installed. Please install Maven."
    exit 1
fi

echo "Pulling latest changes (optional, ensure you are on the right branch)..."
# git pull origin main 

echo "Starting Spring Boot application..."
# Check if we are in the backend directory
if [ -f "pom.xml" ]; then
    mvn spring-boot:run
else
    echo "pom.xml not found. Are you in the 'backend' directory?"
    exit 1
fi
