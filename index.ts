const express = require("express");
const app = express();
app.get("/", (req, res) => {
	console.log(`request at ${new Date().toString()}`)
  	res.send("<h1>Hi Kenny!!!</h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
