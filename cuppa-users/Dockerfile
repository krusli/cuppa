FROM node:8
WORKDIR /usr/src/app

# Install dependencies
# wildcard to also copy package-lock
COPY package*.json ./
RUN npm install
RUN npm i -g nodemon

# Now bundle the app's source code inside the Docker image
# NOTE: only copying package.json previously allows us to take advantage
# of cached Docker layers
# COPY . .

EXPOSE 3000

WORKDIR /usr/src/app/src
CMD [ "nodemon", "app" ]
