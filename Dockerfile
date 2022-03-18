FROM node:14.18.0

# Make sure to also have you .env file to copy over
COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]
