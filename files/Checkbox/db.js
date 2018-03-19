var mongo = require('mongodb');
const faker = require("faker");
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

exports.insertStudy = function (req, res) {
  var id1, study1 = {
    "name": faker.name.findName(),
    "description": "Test Records for Debugging",
    "studyKind": "survey",
    "researcherName": faker.name.findName(),
    "contact": faker.internet.email(),
    "awards": null,
    "awardOptions": [
      "Amazon Gift Card",
      "Github Swag",
      "BrowserStack",
      "Windows Surface RT",
      "iPad Mini",
      "Other",
      "None"
    ],
    "status": "open",
    "goal": "100",
    "invitecode": "RESEARCH",
    "markdown": "",
    "token": "1",
    "adminLink": "/studies/admin/?token=1",
    "publicLink": "/studies/?id=" + `${faker.random.number()}`
  }
  MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin", function (err, authdb) {
    // Now you can use the database in the db variable
    db = authdb;
    console.log(err || "connected!");

    db.collection("studies").insertOne(study1, function (err, res) {
      if (err) throw err;
      id1 = res["ops"][0]["_id"];
      console.log(id1);
      db.close();
    });
  });
  return id1;
}

exports.insertVote = function (req, res) {
  var id2, vote1 = {
    "studyId": "",
    "timestamp": "",
    "ip": faker.internet.ip(),
    "fingerprint": "2019582184",
    "answers": [
      {
        "question": 1,
        "kind": "multichoice",
        "answer": [
          "0"
        ]
      },
      {
        "question": 2,
        "kind": "singlechoice",
        "answer": "0"
      },
      {
        "question": 3,
        "kind": "singlechoicetable",
        "answer": {
          "3_0": "1",
          "3_1": "2",
          "3_2": "3",
          "3_3": "2"
        }
      },
      {
        "question": 4,
        "kind": "multichoicetable",
        "answer": {
          "4_0": [
            "2"
          ],
          "4_1": [
            "1"
          ],
          "4_2": [
            "2"
          ],
          "4_3": [
            "2"
          ]
        }
      }
    ],
    "email": faker.internet.email(),
    "contact": "false"
  }
  MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin", function (err, authdb) {
    // Now you can use the database in the db variable
    db = authdb;
    console.log(err || "connected!");
    db.collection("votes").insertOne(vote1, function (err, res) {
      if (err) throw err;
      id2 = res["ops"][0]["_id"];
      console.log(id2);
      return id2;
      db.close();
    });
  });
}


exports.closeDB = function (req, res) {
  db.close();
}