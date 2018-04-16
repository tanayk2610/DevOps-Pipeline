const needle = require('needle');
    var faker = require('faker');
    var studyObj1 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"dataStudy",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "kind":"BROWSERSTACK",
    "email":"a@b.cl",
    "status":"open",
    "goal":"100",
    "invitecode":"RESEARCH",
    "markdown":"abc",
    "token":"1",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj2 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"survey",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "kind":"IPADMINI",
    "email":"a@b.cl",
    "status":"open",
    "goal":"100",
    "invitecode":"RESEARCH",
    "markdown":"abc",
    "token":"2",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj3 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"dataStudy",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "kind":"SURFACE",
    "email":"a@b.cl",
    "status":"open",
    "goal":"100",
    "invitecode":"TEST",
    "markdown":"abc",
    "token":"3",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj4 = 
{
    "name":"fheiafhazn",
    "description":"frejhtkjwavbsjdy298qywhsila",
    "studyKind":"dataStudy",
    "researcherName":"ABS",
    "contact":"a@b.cl",
    "awards":null,
    "awardOptions":[
        "Amazon Gift Card",
        "Github Swag",
        "BrowserStack",
        "Windows Surface RT",
        "iPad Mini",
        "Other",
        "None"
    ],
    "kind":"GITHUB",
    "email":"a@b.cl",
    "status":"open",
    "goal":"100",
    "invitecode":"TEST",
    "markdown":"abc",
    "token":"3",
    "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
    "publicLink":"/studies/?id=5aaef796e96045070ea73042"
}

var studyObj5 = 
    {
        "name":"fheiafhazn",
        "description":"frejhtkjwavbsjdy298qywhsila",
        "studyKind":"dataStudy",
        "researcherName":"ABS",
        "contact":"a@b.cl",
        "awards":null,
        "awardOptions":[
            "Amazon Gift Card",
            "Github Swag",
            "BrowserStack",
            "Windows Surface RT",
            "iPad Mini",
            "Other",
            "None"
        ],
        "kind":"AMZN",
        "email":"a@b.cl",
        "status":"open",
        "goal":"100",
        "invitecode":"RESEARCH",
        "markdown":"abc",
        "token":"1",
        "adminLink":"/studies/admin/?token=e5335bf1a54bf0f1a1144ff1b856e012b950a5a9bdcef21edd0f28dfa98bf2ca9b89a6f3cbd278c91439d937a11d5b41",
        "publicLink":"/studies/?id=5aaef796e96045070ea73042"
    }


voteObj = {
    "_id": "5xx555x55555555555555x55",
    "studyId": "5aa555a55555555555555a55",
    "timestamp": "",
    "answers": '[{ "kind": " "}]',
    "ip": faker.internet.ip(),
    "fingerprint": "2019582184",
    "email": faker.internet.email(),
    "contact": "false"
}
    try{
                    needle.post("localhost:3002/api/design/survey",studyObj1,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/design/survey",studyObj2,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/design/survey",studyObj3,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                needle.post("localhost:3002/api/design/survey",studyObj4,{ json: true });
        } catch (e) {
            console.log(e);
        }
        try{
            needle.post("localhost:3002/api/design/survey",studyObj5,{ json: true });
    } catch (e) {
        console.log(e);
    }
    try{
                needle.get("localhost:3002/api/study/load/5aa555a55555555555555a55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/1aa111a11111111111111a11");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/2aa222a22222222222222a22");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/1zz111z11111111111111z99");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/2aa222a22222222222222a99");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/5xx555x55555555555555x55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/5zz555z55555555555555z55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/load/1zz111z11111111111111z11");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/vote/status");

            } catch (e) {
                console.log(e);
            }
            try{
                needle.get("localhost:3002/api/study/status/5aa555a55555555555555a55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/1aa111a11111111111111a11");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/2aa222a22222222222222a22");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/1zz111z11111111111111z99");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/2aa222a22222222222222a99");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/5xx555x55555555555555x55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/5zz555z55555555555555z55");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/status/1zz111z11111111111111z11");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/listing");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/create",studyObj1,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/create",studyObj2,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/create",studyObj3,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                needle.post("localhost:3002/api/study/create",studyObj4,{ json: true });
        } catch (e) {
            console.log(e);
        }
        try{
            needle.post("localhost:3002/api/study/create",studyObj5,{ json: true });
    } catch (e) {
        console.log(e);
    }
    try{
                    needle.post("localhost:3002/api/study/vote/submit/",voteObj,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/1");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/2");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/3");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/download/1");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/download/2");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/download/3");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/assign/1");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/assign/2");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.get("localhost:3002/api/study/admin/assign/3");

            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/open/",studyObj1,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/open/",studyObj2,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/open/",studyObj3,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                needle.post("localhost:3002/api/study/admin/open/",studyObj4,{ json: true });
        } catch (e) {
            console.log(e);
        }
        try{
            needle.post("localhost:3002/api/study/admin/open/",studyObj5,{ json: true });
    } catch (e) {
        console.log(e);
    }
    try{
                    needle.post("localhost:3002/api/study/admin/close/",studyObj1,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/close/",studyObj2,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/close/",studyObj3,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                needle.post("localhost:3002/api/study/admin/close/",studyObj4,{ json: true });
        } catch (e) {
            console.log(e);
        }
        try{
            needle.post("localhost:3002/api/study/admin/close/",studyObj5,{ json: true });
    } catch (e) {
        console.log(e);
    }
    try{
                    needle.post("localhost:3002/api/study/admin/notify/",studyObj1,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/notify/",studyObj2,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                    needle.post("localhost:3002/api/study/admin/notify/",studyObj3,{ json: true });
            } catch (e) {
                console.log(e);
            }
            try{
                needle.post("localhost:3002/api/study/admin/notify/",studyObj4,{ json: true });
        } catch (e) {
            console.log(e);
        }
        try{
            needle.post("localhost:3002/api/study/admin/notify/",studyObj5,{ json: true });
    } catch (e) {
        console.log(e);
    }
    
