const express = require('express');
const cors = require('cors');

const postRouter = require('./routers/post');

const api = express();

api.use(cors());
api.use(express.json());

api.get("/", (req, res) => {
    res.json({
        name: "Discretion",
        description: "Send and receive private messages."
    })
})

api.use("/posts", postRouter);

module.exports = api;