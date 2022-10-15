const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("./client/build"));

app.get("/api/test", (req, res) => res.json({result: "ok"}));

app.listen(port, () => console.log(`Listening at localhost:${port}`));