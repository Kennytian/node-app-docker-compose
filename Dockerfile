FROM node:lts-alpine
WORKDIR /app
COPY . ./
ENV PORT 3000
EXPOSE $PORT
RUN yarn && yarn build
CMD ["yarn", "start:prod"]
