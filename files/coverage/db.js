var mongo = require('mongodb');
const faker = require("faker");
var Server = mongo.Server,
  Db = mongo.Db,
  ObjectID = mongo.ObjectID;

var MongoClient = mongo.MongoClient;
//var db = null;
// MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin", function (err, authdb) {
//   // Now you can use the database in the db variable
//   db = authdb;
//   console.log(err || "connected!");
// });

exports.connectDB = function () {
  return MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin");
}

exports.insertStudy = function (db) {
  // console.log("Inside insertStudy")
  var id1,
    study1 = {
      "_id": new mongo.ObjectId("5aa555a55555555555555a55"),
      "name": faker.name.findName(),
      "description": "Test Records for Debugging000000000000000000000000",
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
    },
    study2 = {
      "_id": new mongo.ObjectId("1aa111a11111111111111a99"),
      "name": faker.name.findName(),
      "description": "aaaaaaa",
      "studyKind": "dataStudy",
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
      "token": "2",
      "adminLink": "/studies/admin/?token=1",
      "publicLink": "/studies/?id=" + `${faker.random.number()}`
    },
    study3 = {
      "_id": new mongo.ObjectId("2aa222a22222222222222a99"),
      "name": faker.name.findName(),
      "description": "bbbbbbbbbbbbbbbb",
      "studyKind": "analysis",
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
      "token": "3",
      "adminLink": "/studies/admin/?token=1",
      "publicLink": "/studies/?id=" + `${faker.random.number()}`
    }
  MongoClient.connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_IP + ":27017/site?authSource=admin", function (err, authdb) {
    // Now you can use the database in the db variable
    db = authdb;
    console.log(err || "connected!");

    // db.collection("studies").insertOne(study1, function (err, res) {
    //   if (err) throw err;
    //   id1 = res["ops"][0]["_id"];
    //   // console.log(id1);
    //   // db.close();
    // }
    // );
    db.collection("studies").insertOne(study2, function (err, res) {
      if (err) throw err;
      id1 = res["ops"][0]["_id"];
      // console.log(id1);
      // db.close();
    }
    );
    db.collection("studies").insertOne(study3, function (err, res) {
      if (err) throw err;
      id1 = res["ops"][0]["_id"];
      // console.log(id1);
      // db.close();
    }
    );
  });
  // console.log("Exiting Insertstudy")
  return id1;
}

exports.insertVote = function (db) {
  // console.log("inside insertVote")
  var id2,
    vote1 = {
      "_id": "5xx555x55555555555555x55",
      "studyId": "5aa555a55555555555555a55",
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
    },
    vote2 = {
      "_id": "5zz555z55555555555555z55",
      "studyId": "1aa111a11111111111111a11",
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
    },
    vote3 = {
      "_id": "1zz111z11111111111111z11",
      "studyId": "2aa222a22222222222222a22",
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
    // db.collection("votes").insertOne(vote1, function (err, res) {
    //   if (err) throw err;
    //   id2 = res["ops"][0]["_id"];
    //   // console.log(id2);
    //   return id2;
    //   // db.close();
    // });
    // db.collection("votes").insertOne(vote2, function (err, res) {
    //   if (err) throw err;
    //   id2 = res["ops"][0]["_id"];
    //   // console.log(id2);
    //   return id2;
    //   // db.close();
    // });
    // db.collection("votes").insertOne(vote3, function (err, res) {
    //   if (err) throw err;
    //   id2 = res["ops"][0]["_id"];
    //   // console.log(id2);
    //   return id2;
    //   // db.close();
    // });
  });
}


exports.closeDB = function (req, res) {
  db.close();
}