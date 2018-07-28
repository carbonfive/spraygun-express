FROM node:8.11.3-alpine
WORKDIR /app-prototype
COPY package.json yarn.lock ./
RUN mkdir ./client
COPY client/package.json client/yarn.lock ./client/
RUN npx yarn@1.7.0 install --production
COPY . .
RUN cd client && npm run build
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "app/server.js"]
