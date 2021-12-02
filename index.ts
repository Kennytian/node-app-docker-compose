const express = require("express");
const app = express();
app.get("/", (req, res) => {
	const date = new Date().toString();
	console.log(`request at ${date}`);
	res.send(`<h1>Hello Docker at ${date}</h1>
		<p>HOST:${process.env.HOST}</p>
		<p>PORT:${process.env.PORT}</p>
	`);
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
