FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--", "--host", "0.0.0.0"]

# docker run -p 4000:5174 client-app