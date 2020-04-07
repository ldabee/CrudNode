const moment = require('moment');

module.exports = function (app, connection) {

  //GET ALL USERS
  app.get('/api/users', function (req, res) {
    connection.serialize(() => {
      connection.all('SELECT * FROM users', function (err, data) {
        (err) ? res.send(err) : res.json({ data })
      })
    })
  });

  //GET USER SELECTED
  app.get('/api/users/:id', function (req, res) {
    connection.serialize(() => {
      connection.all('SELECT * FROM users WHERE id = ?', req.params.id, function (err, data) {
        console.log(data);
        (err) ? res.send(err) : res.json({ data })
      })
    })
  })

  //DELETE USER SELECTED
  app.post('/api/delete/:id', function (req, res) {
    connection.serialize(() => {
      connection.all('DELETE FROM users WHERE id = ?',
        [req.params.id],
        function (err, result) {
          if (!err) {
            if (result) {
              connection.serialize(() => {
                connection.all('SELECT * FROM users', function (err, data) {
                  (err) ? res.send(err) : res.json({ data })
                })
              })
            }
          }
        })
    })
  })

  //ADD USER
  app.post('/api/create', function (req, res) {
    connection.serialize(() => {
      connection.all('INSERT INTO users (name,surname,email,img_url,created_at,updated_at) VALUES (?,?,?,?,?,?)',
        [req.body.user.name, req.body.user.surname, req.body.user.email, req.body.user.img_url, new Date(), new Date()],
        function (err, result) {
          (err) ? res.send(err) : connection.all('SELECT * FROM users', function (err, data) {
            console.log(data);
            (err) ? res.send(err) : res.json({ data })
          })
        })
    })
  })

  //UPDATE USER
  app.post('/api/update/:id', function (req, res) {
    connection.serialize(() => {
      connection.all(
        'UPDATE users SET name=?,surname=?,email=?,img_url=?,level=?,updated_at=?  WHERE (id = ?)',
        [
          req.body.name,
          req.body.surname,
          req.body.email,
          req.body.img_url,
          req.body.level,
          moment(new Date()).format(),
          req.body.id
        ],
        function (err, results) {
          if (!err) {
            if (results) {
              connection.all('SELECT * FROM users', function (err, results) {
                if (!err) {
                  res.status(200).json({ results });
                } else {
                  res.status(403).json({ err });
                }
              });
            } else {
              res.status(400).json({ results });
            }
          } else {
            res.status(403).json({ err });
          }
        },
      );
    })
  });

  //GET ALL AVATARS FOR USER SUBSCRIPTION
  app.get('/api/avatars', function (req, res) {
    connection.serialize(() => {
      connection.all('SELECT * FROM avatars', function (err, data) {
        (err) ? res.send(err) : res.json({ data })
      })
    })
  })
}