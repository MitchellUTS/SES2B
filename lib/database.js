const mongo = require('mongodb').MongoClient;

export default function connection() {
    return new Promise((resolve, reject) => {
        mongo.connect(process.env.MongoConnectionString, function(err, client) {
            if (err) {
                reject(err)
            } else {
                resolve(client)
            }
        });
    });
}

export function table(database, collection) {
    return new Promise((resolve, reject) => {
        mongo.connect(process.env.MongoConnectionString, function(err, client) {
            if (err) {
                reject(err)
            } else {
                resolve(client.db(database).collection(collection));
            }
        });
    });
}