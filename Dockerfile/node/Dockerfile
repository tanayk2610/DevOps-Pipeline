FROM node:latest

# Create app directory
WORKDIR /usr/src/checkbox.io

# Setting up env variables
ENV MONGO_PORT 3002
ENV MONGO_USER devopsknights
ENV MONGO_PASSWORD devops123
ENV MAIL_USER devopsknights@gmail.com
ENV MAIL_PASSWORD devops123

# Bundle app source
COPY ./checkbox.io .

WORKDIR server-side/site/

# Installing required packages
RUN npm install

# Expose checkbox.io port
EXPOSE 3002

# Expose redis port
EXPOSE 6379

# Running the application
CMD ["nodejs","server.js"]
