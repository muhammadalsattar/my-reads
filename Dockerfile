FROM node

WORKDIR /my-reads

COPY . /my-reads

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]