const express = require('express');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    try {

        const usersCollection = client.db('repliq-task').collection('users')
        const productsCollection = client.db('repliq-task').collection('products')
        const cartProduct = client.db('repliq-task').collection('cart')



        app.get('/products', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result);
        })

        app.get('/item/:_id', async (req, res) => {
            const id = req.params._id;
            console.log(id);
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.findOne(query)
            res.send(result)

        })


        app.get('/cart', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email }
            const result = await cartProduct.find(query).toArray();
            res.send(result);

        })

        app.post('/cart', async (req, res) => {
            const product = req.body;
            const result = await cartProduct.insertOne(product);
            res.send(result);
        })



        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.delete('/item/:_id', async (req, res) => {
            const _id = req.params._id;
            console.log(_id);
            const query = { _id: new ObjectId(_id) }
            const result = await cartProduct.deleteOne(query);
            res.send(result);
        })


        app.put('/updateCart', async (req, res) => {
            const email = req.query.email;
            const _id = req.query._id;
            const quantity = req.body.quantity;

            const filter = {
                email: email,
                _id: new ObjectId(_id)
            }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: quantity
                }
            }

            const result = await cartProduct.updateOne(filter, updatedDoc, options);
            res.send(result);
        })








    }

    finally {



    }

}
run().catch(error => console.log(error));


app.get('/', (req, res) => {
    res.send('server start')
})

app.listen(port, () => {
    console.log('server running on port ', port);
})