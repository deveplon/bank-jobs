FROM node:10-alpine

WORKDIR /home/node/app

# Copy packages & package-lock.json
COPY package*.json ./

# Give Permision to all copy files on folder
COPY . .

# Install dependencies
RUN npm install --quiet -f

EXPOSE 3000

CMD [ "node" ]
