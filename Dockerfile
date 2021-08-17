FROM node:14.17.5-alpine
WORKDIR /app-prototype
COPY package.json yarn.lock ./
RUN npx yarn@1.12.1 install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD npm run server
