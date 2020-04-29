const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.ATLAS_CONNECTION;

const dbName = 'sonic-acuity';
const colName = 'tracks';

const settings = { useUnifiedTopology: true };

const getTracks = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully connected to database to GET tracks");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

// const getTrackByID = (id) => {
//     const iou = new Promise((resolve, reject) => {
//         MongoClient.connect(url, settings, function(err, client) {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log("Successfully connected to database to GET tracks by ID");
//                 const db = client.db(dbName);
//                 const collection = db.collection(colName)
//                 collection.find({ _id : ObjectID(id) }).toArray(function(err, docs) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(docs);
//                         client.close();
//                     };
//                 });
//             };
//         });
//     });
//     return iou;
// };

// const getTrackByValue = (key, value) => {
//     const iou = new Promise((resolve, reject) => {
//         MongoClient.connect(url, settings, function(err, client) {
//             if (err) {
//                 reject(err);
//             } else {
//                 console.log("Successfully connected to database to GET tracks by value")
//                 const db = client.db(dbName);
//                 const collection = db.collection(colName);
//                 collection.find({ key : value }).toArray(function(err, docs) {
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(docs);
//                         client.close();
//                     };
//                 });
//             };
//         });
//     });
//     return iou;
// };

const addTrack = (tracks) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url,settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully connected to database to ADD tracks");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(tracks, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close(); 
                    };
                });                 
            };
        });
    });
    return iou;
};

const updateTrack = (id, track) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully connected to database to UPDATE tracks")
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({ _id: ObjectID(id) },
                    track,
                    { upsert: true },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ updated_id: id });
                            client.close();
                        };
                    }
                );
            };
        });
    });
    return iou;
};

const deleteTrack = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Successfully connected to database to DELETE tracks");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id : ObjectID(id) }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deletedID : id })
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = {
    getTracks,
    // getTrackByID,
    // getTrackByValue,
    addTrack,
    updateTrack,
    deleteTrack
};