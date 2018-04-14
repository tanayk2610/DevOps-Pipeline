FROM node:latest

# Create app directory
WORKDIR /usr/src/checkbox

# Setting up env variables
ENV MONGO_PORT 3002
ENV MONGO_IP 192.168.33.10
ENV MONGO_USER devopsknights
ENV MONGO_PASSWORD devops123

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./checkbox.io/server-side/site/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY ./checkbox.io .

EXPOSE 8080
CMD ipconfig
# cd server-side/site/ && node server.js
# CMD ls