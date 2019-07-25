FROM node:10-alpine

ENV APP_ROOT /src

# Create app directory
RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

# Install app dependencies
RUN npm install

# Set environment variables
ENV NODE_ENV development
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# Bundle app source - Only for production
RUN if [ "${NODE_ENV}" == "production"]; then docker run npm run build fi

EXPOSE 3000

CMD [ "npm", "run dev"]
