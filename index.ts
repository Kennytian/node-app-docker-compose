import express from 'express';
import {createConnection} from "mysql2/promise";
import {createClient} from 'redis';

const app = express();

let isInit = false;
let redis = null;
let mysqlClient = null;

async function init() {
    redis = createClient({url: process.env.REDIS_URI});
    await redis.connect();
    mysqlClient = await createConnection({uri: process.env.MYSQL_URI});
    isInit = true;
}

app.get("/", async (req, res) => {
    if (!isInit) {
        await init();
    }

    const date = new Date().toString();
    console.log(`request at ${date}`);
    const [rows] = await mysqlClient.execute('SELECT * FROM `time_zone_name` WHERE `Name` = ? AND `Time_zone_id` > ?', ['Asia/Shanghai', 308]);

    await redis.set('now', date);
    const timeNowFromRedis = await redis.get('now');

    res.send(`<h1>7Hello Docker at ${date}</h1>
		<p>HOST:${process.env.HOST}</p>
		<p>PORT:${process.env.PORT}</p>
		<p>ENV3:${process.env.ENV3}</p>
		<p>ENV4:${process.env.ENV4}</p>
		<p>ENV5:${process.env.ENV5}</p>
		<p>FROM:${process.env.FROM}</p>
		<p>HELLO:${process.env.HELLO}</p>
		<p>redis result:${timeNowFromRedis}</p>
		<p>mysq result:${JSON.stringify(rows[0])}</p>
	`);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
