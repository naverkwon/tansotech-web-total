FROM nginx:alpine
COPY . /usr/share/nginx/html
# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
