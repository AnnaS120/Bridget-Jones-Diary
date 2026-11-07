const { Pool } = require("pg");
const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env")
});


const db = new Pool({
    connectionString: process.env.DB_URL
});

module.exports = db;