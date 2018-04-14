FROM node:latest

# Create app directory
WORKDIR /usr/src/

# Setting up env variables
ENV MONGO_PORT 3002
ENV MONGO_IP 192.168.33.101
ENV MONGO_USER devopsknights
ENV MONGO_PASSWORD devops123

# Bundle app source
COPY ./checkbox.io .

WORKDIR /usr/sec/checkbox.io/server-side/site/

# Installing required packages
RUN npm install

# Expose checkbox.io port
EXPOSE 3002

# Running the application
CMD ["nodejs","server.js"]
