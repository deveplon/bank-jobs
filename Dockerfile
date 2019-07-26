FROM node:10-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy packages & package-lock.json
COPY package*.json ./

# Add the user describe before
USER node

# Install app dependencies
RUN npm install -f

# Give Permision to all copy files on folder
COPY --chown=node:node . .

# Set environment variables
ENV NODE_ENV development
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# Bundle app source - Only for production
# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
