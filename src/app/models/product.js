const MongoClient = require('mongodb').MongoClient;

const url = require('../../private/key');

exports.createProduct = async(req, res, next) => {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
        client.db("firebase").collection("productDataBase").insertOne(req.body)
        client.close();
        res.status(200).send({ statusText:"product create with sucess" })
    });
}

exports.createIndexProduct = async(req, res, next) => {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
        client.db("firebase").collection("productDataBase").createIndex( { productNameQuery: "text", productDescriptionQuery: "text" } )
        client.close();
        res.status(200).send({ statusText:"product create with sucess" })
    });
}

exports.searchAllProducts = async(req,res,next)=> {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
       client.db("firebase").collection("productDataBase").find({}).toArray(function(err, result) {
          res.status(200).send( result )
          client.close();
        });
    });
}

exports.searchProductsByText = async(req,res,next)=> {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, async function (err, client) {
        await client.db("firebase").collection("productDataBase").find( { $text: { $search: req.query.text } } ).toArray(function(err, result) {
            res.status(200).send( result )
          client.close();
        });
    });
}

exports.searchProductsByRegex = async(req,res,next)=> {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, async function (err, client) {
        var query = { productNameQuery:  new RegExp(req.query.text, 'gi') }
        await client.db("firebase").collection("productDataBase").find(query).toArray(function(err, result) {
            res.status(200).send( result )
            client.close();
        });
    });
}

exports.searchProductsById = async(req,res,next)=> {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
        client.db("firebase").collection("productDataBase").find({ PRIMARY_KEY: req.params.id }).toArray(function(err, result) {
            res.status(200).send( result )
          client.close();
        });
    });
}

exports.updateProductsById = async(req, res, next) => {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
        client.db("firebase").collection("productDataBase").updateOne({ PRIMARY_KEY:req.params.id }, { $set: req.body }, function(err, result) {
            res.status(200).send( result )
            client.close();
        });
    });
}

exports.deleteProductsById = async(req, res, next) => {
    MongoClient.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, client)=> {
        client.db("firebase").collection("productDataBase").deleteOne({ PRIMARY_KEY:req.params.id }, function(err, result) {
            res.status(200).send( result )
            client.close();
        });
    });
}













