FROM debian:bookworm
EXPOSE 3000
COPY . . 
RUN apt update 
RUN apt install nodejs npm -y
RUN npm i
CMD ["npm","run","dev"]
