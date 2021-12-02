FROM node:lts-alpine
WORKDIR /app
COPY . ./
ENV APK_MIRROR='s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' \
    TZ=Asia/Shanghai
RUN sed -i ${APK_MIRROR} /etc/apk/repositories \
    && apk add tzdata && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && apk del tzdata
RUN yarn && yarn build
CMD ["yarn", "start:prod"]
