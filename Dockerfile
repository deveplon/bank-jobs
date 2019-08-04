FROM node:10-alpine

WORKDIR /home/node/app

# Copy packages & package-lock.json
COPY package*.json ./

# Give Permision to all copy files on folder
COPY . .

# Install dependencies
RUN npm install -g pm2 -f
RUN npm install --quiet -f

# Bundle app source - Only for production
RUN npm run build

EXPOSE 3000

CMD [ "node" ]
