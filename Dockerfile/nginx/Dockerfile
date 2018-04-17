FROM nginx

# Copy config files
COPY ./checkbox.io/local-conf/nginx.conf /etc/nginx/
COPY ./checkbox.io/local-conf/default /etc/nginx/sites-available/

WORKDIR /usr/src/checkbox.io

# Bundle app source
COPY ./checkbox.io .

# Expose port
EXPOSE 80