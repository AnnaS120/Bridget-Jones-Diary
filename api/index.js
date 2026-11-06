require('dotenv').config();

const api = require('./api');
const PORT=3007
api.listen(PORT, () => {
    console.log(`API listening on port ${PORT}...`);
});