const express = require('express')
const app = express()
const port = 3000

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('hits.db');

// This route allows data for a given URL to be inserted into the db.
app.get('/insert', function (req, res) {
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
  res.status(201).end()
})

// This route returns records for a given URL, to be used in reports, etc. 
app.get('/read', function (req, res) {
  var sql = "SELECT * FROM hits WHERE url = ?"
  var params = [decodeURI(req.query.url)] 
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
   }
   res.json({"message":"success", "data":rows})
  })
})

// Default response for nonexistent routes.
app.use(function (req, res) {
  res.status(404)
  res.end()
});

app.listen(port, () => console.log(`GreatestHits logging service listening at http://localhost:${port}`))

