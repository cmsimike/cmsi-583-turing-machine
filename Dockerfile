FROM node:14.1
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "test"]