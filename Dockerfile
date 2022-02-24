FROM nginx:1.21.4
EXPOSE 80

ENV REACT_APP_API_URL `cat /app/config/.env`
WORKDIR /setup
COPY . .
RUN cp -a /setup/build/. /usr/share/nginx/html/
RUN rm -rf /setup/*

