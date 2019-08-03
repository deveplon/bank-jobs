FROM node:10-alpine

# Create app directory
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Copy packages & package-lock.json
COPY package*.json ./

USER root
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet -f && \
  apk del native-deps

# Add the user describe before
USER node

# Give Permision to all copy files on folder
COPY --chown=node:node . .

# Bundle app source - Only for production
# RUN npm run build

EXPOSE 3000

CMD [ "node" ]
