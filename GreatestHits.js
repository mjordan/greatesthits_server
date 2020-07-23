const express = require('express')
const app = express()
const port = 3000

// This route allows data for a given URL to be inserted into the db.
app.get('/insert', function (req, res) {
  var sqlite3 = require('sqlite3').verbose();
  var db = new sqlite3.Database('hits.db');

  // ISO 8601 date with zero UTC offset timezone.
  var now = new Date();

  // @todo: Validate the query params and return an error response code if any fail.
  // @todo: Add a token param to authenticate the request. 

  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO hits VALUES (NULL, (?), (?), (?), (?))");
    stmt.run(now.toISOString(), decodeURI(req.query.url), req.query.type, req.query.ip);
    stmt.finalize();
  });
 
  db.close();
  // 200 OK
  res.send('')
})

// This route will in future provide records for a given URL, to be used in reports, etc. 
app.get('/read', function (req, res) {
  res.send('Hi, reading records is not ready yet.')
})

app.listen(port, () => console.log(`GreatestHits logging service listening at http://localhost:${port}`))

