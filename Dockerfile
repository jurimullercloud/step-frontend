FROM nginx:1.21.4
EXPOSE 80

ARG API_URL
ENV REACT_APP_API_URL = ${API_URL}

WORKDIR /app
#(assuming ec2 installed node and npm and build the repo)
COPY . .

# copy contents of build folder to nginx serve directory 
RUN cp -a build/. /usr/share/nginx/html/

# clean up the working directory
RUN rm -rf *



