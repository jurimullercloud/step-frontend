FROM nginx:1.21.4
EXPOSE 80
# install node, and npm
RUN apt-get update && \
    apt install nodejs npm -y 

WORKDIR /app
COPY . .

ARG API_URL
ENV REACT_APP_API_URL = ${API_URL}

RUN npm install --legacy-peer-deps
RUN npm run build

# copy contents of build folder to nginx serve directory
RUN cp -a build/. /usr/share/nginx/html/

# clean up the working directory
RUN rm -rf *



