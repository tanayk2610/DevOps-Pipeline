var mongo = require('mongodb');
var faker = require('faker');

var Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = mongo.ObjectID;


var MongoClient = mongo.MongoClient;
var db = null;
MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin", function (err, authdb) {
    // Now you can use the database in the db variable
    db = authdb;
    console.log(err || "connected!");
});

var studies = null;

var loops = faker.random.number({min: 5000, max: 10000});

var study = null;

setTimeout(function(){

    db.collection('studies', function (err, collection) {
        if (err)
            console.log(err);

        studies = collection;
    });
    for (var i = 0; i < loops; i++) {
        study = {
            "name": faker.name.findName(),
            "description": faker.lorem.paragraph(),
            "studyKind": "dataStudy",
            "researcherName": faker.name.findName(),
            "contact": faker.internet.email(),
            "invitecode" : "RESEARCH",
            "goal": faker.random.number({min: 2, max: 10})
        };
        studies.insert(study, { safe: true }, function (err, result) {
            console.log(err || "Study created: " + study._id);

            if (err) {
                res.send({ error: err });
            }
            else {
                console.log(`Entering data: ${study.name}`);
            }
        });
    }
},5000);
