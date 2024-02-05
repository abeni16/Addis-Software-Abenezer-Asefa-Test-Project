# Use Node.js image as base image
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files to container
COPY . .

# Expose port 3000
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
