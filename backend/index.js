const { MongoClient } = require("mongodb");
const config = require('config');
const express = require('express');
const cors = require('cors');
                             
const url = "mongodb+srv://jfcarvalho4:" + config.get('database.mongodb_atlas_password') + "@cluster0.pdaeb9w.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to database");

        const app = express();

        app.use(cors({
            origin: 'http://localhost:3000'
        }));

        require('./routes')(app);

        const host = 'localhost';
        const port = 3010;

        const server = app.listen(port, host, (err) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`Server is running on ${host}:${server.address().port}`);
        });

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);