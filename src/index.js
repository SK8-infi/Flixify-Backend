import express from 'express';
import connection from './db/db.js';

const app = express();
const PORT = process.env.PORT || 4000



connection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on port  ${PORT}`);
        })
    })
    .catch(() => {
        console.log("CONECTION TO MONGODB FAILED");
    })