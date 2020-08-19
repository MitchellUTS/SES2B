const mongoose = require('mongoose');
const URI = process.env.DB_CONNECTION;

export function connection() {
    mongoose.connect(URI, { useNewUrlParser: true })
        .then((data) => { console.log(data); })
        .catch((err) => { console.error(err); });
}

// const MongoClient = require('mongodb').MongoClient;
// let client = new MongoClient(URI, { useNewUrlParser: true });

// export function connection() {
//     return new Promise((resolve, reject) => {
//         client.connect(function(err, client) {
//             if (err) {
//                 // console.log("in the if statement now");
//                 reject(err);
//             } else {
//                 resolve(client);
//                 // console.log('Connected to DB');
//             }
//         });
//     });
// }

// export function table(database, collection) {
//     return new Promise((resolve, reject) => {
//         client.connect(function(err, client) {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(client.db(database).collection(collection));
//             }
//         });
//     });
// }
