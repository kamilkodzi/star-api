FROM node:alpine as base
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY ./ ./
EXPOSE 4000

FROM base as dev
RUN npm install --only=dev
CMD ["npm","run","dev"]