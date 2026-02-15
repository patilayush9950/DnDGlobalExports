#!/bin/bash

# Ensure we use Java 17 for this project
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home

echo "Starting Exim Royals Backend with Java 17..."
echo "JAVA_HOME set to: $JAVA_HOME"

# Run Spring Boot
mvn spring-boot:run
