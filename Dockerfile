# Using latest node image
FROM node:latest

# Establish working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and install packages
COPY package.json /usr/src/app
RUN npm install

# Copy app
COPY . /usr/src/app

# Expose port 8080 for server APIs
EXPOSE 8080

# Start server within container
CMD ['node', 'server.js']