FROM "node:20.10"

WORKDIR /backend

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

CMD ["npm", "start"]
