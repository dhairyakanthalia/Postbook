const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dhairyakanthalia:noAU70baUwvIcynC@cluster0.wpno5nv.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = client.db('sample_mflix');
const collection = dbName.collection('movies');

async function dbConnect(){
    let result  = await client.connect();
    db = result.db(dbName);
    return db.collection(collection);
}

dbConnect().then((res)=>{
    console.warn(res.find().toArray());
})