FROM node:14

# Create app directory
WORKDIR /usr/src/whisker

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

RUN yarn

# Bundle app source
COPY . .
COPY .env.production .env

RUN yarn build

# Set production mode
ENV NODE_ENV production

EXPOSE 8080
CMD [ "node", "dist/index.js" ]

# Make sure user is not root
USER node
