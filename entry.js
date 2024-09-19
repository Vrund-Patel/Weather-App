const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const path = require('path');
const mime = require('mime');

const uri = "mongodb+srv://haider:haider@app.zqov1dw.mongodb.net/?retryWrites=true&w=majority";
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set Content-Type header for static files
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: function (res, path) {
    res.setHeader('Content-Type', mime.getType(path));
  }
}));

// Serve the first page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'weather.html'));
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function setData() {
  try {
    await client.connect();

    const collection = client.db("test").collection("mycollection");
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    const document = {
      ip: data.ip,
      location: {
        city: data.city,
        region: data.region,
        country: data.country,
        postal: data.postal,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
      },
    };

    const result = await collection.insertOne(document);
    return result.insertedId;
  } finally {
    await client.close();
  }
}

async function getData(id) {

  try {
    await client.connect();

    const collection = client.db("test").collection("mycollection");

    const result = await collection.findOne({ _id: new ObjectId(id) });

    return result.location;

  } finally {
    await client.close();
  }
}


app.post('/start', async (req, res) => {
  try {
    const insertedId = await setData();
    const location = await getData(insertedId);
    res.json({ location });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});


app.listen(3000, (req, res) => {
  console.log("App listening on port 3000!");
});