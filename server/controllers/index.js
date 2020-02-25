const models = require('../models');
// const redis = require('redis');

// const client = redis.createClient(6379);

module.exports = {
  gallery: {
    cache: (req, res, next) => {
      const id = req.params.id;
      client.get(id, (err, data) => {
        if (err) {
          console.log(err);
        }
        if(data) {
          res.send(JSON.parse(data));
        } else {
          next();
        }
      })
    },

    getOne: (req, res) => {
      const id = req.params.id;
      models.gallery.getOne(id, (err, results) => {
        if (err) {
          res.sendStatus(500);
          res.end(err);
        } else {
          var reformattedObj = {};
          reformattedObj["listing_id"] = results[0]["listing_id"];
          reformattedObj["listing_title"] = results[0]["listing_title"];
          reformattedObj["listing_images"] = [];
          for (var i = 0; i < results.length; i++) {
            var newObj = {};
            newObj["id"] = results[i]["id"];
            newObj["url"] = results[i]["url"];
            newObj["caption"] = results[i]["caption"];
            reformattedObj["listing_images"].push(newObj);
          }
          res.json([reformattedObj]);
          client.setex(id, 200, JSON.stringify([reformattedObj]));
        }
      });
    },

    getAll: (req, res) => {
      models.gallery.getAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    postOne: (req, res) => {
      console.log(req.body);
      models.gallery.postOne(req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    deleteOne: (req, res) => {
      const id = req.params.id;
      models.gallery.deleteOne(id, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          res.json(results);
        }
      })
    },

    updateOne: (req, res) => {
      const id = req.params.id;
      models.gallery.updateOne(id, req.body, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
          res.json(results);
        }
      })
    },

    deleteAll: (req, res) => {
      models.gallery.deleteAll((err, results) => {
        if (err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },
  }
};
