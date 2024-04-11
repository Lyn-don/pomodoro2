FROM rust:bullseye

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

WORKDIR /app

RUN apt update

RUN apt install -y \
  curl \
  psmisc

RUN apt install -y \
  libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

RUN apt-get install -y \
  webkit2gtk-4.0-dev \
  webkit2gtk-driver \
  xvfb

EXPOSE 1420

RUN cargo install tauri-driver

COPY . /app

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

RUN source ~/.bashrc && nvm install node 
RUN source ~/.bashrc && npm install
RUN source ~/.bashrc && npm run tauri dev
