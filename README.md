### build
> yarn docker:build

### run
> yarn docker:run

### visit
> http://localhost:3000

### develop
> yarn setup && yarn start:dev

> http://localhost:1000

### note
```json5
"scripts": {
    "setup": "yarn --verbose",
    "build": "tsc -p tsconfig.json",
    "start:dev": "PORT=1000 ts-node-dev index.ts",
    "start:prod": "node dist/index.js",
    "docker:remove": "docker-compose down",
    "docker:logs": "docker logs node-app -f",
    "docker:run": "docker-compose up -d",
    "docker:build": "docker-compose build",
    "curl": "curl http://localhost:3000"
}
```

### Troubleshooting
#### can not be connecting mysql server
> `docker exec -it node-mysql mysql -uroot -ppassword mysql -e "update user set Host = '%' where User = 'root'; flush privileges;"`
