// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://localhost:27017'; // If throw error then replace localhost -> 127.0.0.1
// const client = new MongoClient(url);
// // Database Name
// const dbName = 'myProject';
// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('documents');
//     // the following code examples can be pasted here...
//     return 'done.';
// }
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());


// // List of databases
// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Make the appropriate DB calls
//         await listDatabases(client);
//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


// // Create a new database
// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         await createdb(client, "mydatabase");
//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// async function createdb(client, dbname) {
//     const dbobj = await client.db(dbname);
//     console.log("Database created");
//     console.log(dbobj);
// }


// // MongoDB Insert 
// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Create a single new document
//         await createdoc(client, "mydatabase", "products", {
//             "ProductID": 1, "Name": "Laptop", "Price": 25000
//         });
//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
// async function createdoc(client, dbname, colname, doc) {
//     const dbobj = await client.db(dbname);
//     const col = dbobj.collection(colname);
//     const result = await col.insertOne(doc);
//     console.log(`New document created with the following id: ${result.insertedId}`);
// }


// // MongoDB Insert many
// const { MongoClient } = require('mongodb');
// // Connection URL
// const url = 'mongodb://127.0.0.1:27017';
// const client = new MongoClient(url);

// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Create 5 new documents
//         await createdoc(client, "mydatabase", "products", [
//             { 'ProductID': 1, 'Name': 'Laptop', 'price': 25000 },
//             { 'ProductID': 2, 'Name': 'TV', 'price': 40000 },
//             { 'ProductID': 3, 'Name': 'Router', 'price': 2000 },
//             { 'ProductID': 4, 'Name': 'Scanner', 'price': 5000 },
//             { 'ProductID': 5, 'Name': 'Printer', 'price': 9000 }
//         ]);

//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }

// main()
//     .then(() => console.log("Operation completed successfully."))
//     .catch(console.error);

// async function createdoc(client, dbname, colname, docs) {
//     const dbobj = client.db(dbname);
//     const result = await dbobj.collection(colname).insertMany(docs);
//     console.log(`${result.insertedCount} new document(s) created with the following id(s):`);
//     console.log(result.insertedIds);
// }


// // MongoDB Find
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Create a single new listing
//         await listall(client, "mydatabase", "products");
//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }
// async function listall(client, dbname, colname) {
//     const result = await client.db(dbname).collection(colname).find({}).toArray();
//     console.log(JSON.stringify(result));
// }


// // MongoDB Find - Read all documents
// async function main() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Create a single new listing
//         await listall(client, "mydatabase", "products");
//     } catch (e) {
//         console.error(e);
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }
// async function listall(client, dbname, colname) {
//     const result = await client.db(dbname).collection(colname).find({}).toArray();
//     console.log(JSON.stringify(result));
// }

// // MongoDB Find - Read all documents - 2
// async function listall(client, dbname, colname) {
//     const result = await client.db(dbname).collection(colname).find({}).toArray();
//     var count = 0;
//     result.forEach(row => {
//         count++;
//         console.log(count, row['Name'], row['price']);
//     });
// }

const { MongoClient } = require('mongodb');

var dboper = require('./operations');
var express = require('express');


const url = 'mongodb://localhost:27017';
const dbname = 'newspapers';

async function main() {
    const client = await new MongoClient(url);
    console.log('Connected correctly to the server');
    const db = client.db(dbname);

    try {
        const insertResult = await dboper.insertDocument(db, { title: "Exploring the Hidden Gems of Paris", author: "Jane Doe" }, "articles");
        let docs = await dboper.findDocuments(db, "articles");
        console.log('Found documents:', docs);
        const updateResult = await dboper.updateDocument(db, { title: "Exploring the Hidden Gems of Paris" }, { content: "Paris is known for its....." }, "articles");
        docs = await dboper.findDocuments(db, "articles");
        console.log('Found updated documents:', docs);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
