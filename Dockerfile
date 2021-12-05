FROM nginx:1.21.4
EXPOSE 80

ARG API_URL
ENV REACT_APP_API_URL = ${API_URL}

#(assuming ec2 installed node and npm and build the repo)
COPY build /usr/share/nginx/html/



