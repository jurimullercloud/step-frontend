FROM nginx:1.21.4
EXPOSE 80

# install node and npm

# RUN apt-get update && apt-get install -y \
#     software-properties-common \
#     npm

# RUN npm install npm@latest -g && \
#     npm install n -g && \
#     n latest

ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# ENV REACT_APP_API_URL `cat /app/config/.env`

WORKDIR /setup
COPY . .
RUN npm install
RUN npm run build

RUN cp -a /setup/build/. /usr/share/nginx/html/

