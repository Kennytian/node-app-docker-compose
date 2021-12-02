FROM node:lts-alpine
WORKDIR /app
COPY . ./
ENV PORT=3001 \
    TZ=Asia/Shanghai
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add tzdata && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && apk del tzdata
RUN yarn && yarn build
CMD ["yarn", "start:prod"]
