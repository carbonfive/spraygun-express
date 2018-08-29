FROM node:8.11.4-alpine
WORKDIR /app-prototype
COPY package.json yarn.lock ./
RUN npx yarn@1.9.4 install --production
COPY . .
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "app/server.js"]
