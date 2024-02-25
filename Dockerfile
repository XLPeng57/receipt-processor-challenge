FROM node:18
WORKDIR /receipt_processor
COPY . .
RUN npm install
EXPOSE 3000
ENV NODE_ENV production
CMD npm start
