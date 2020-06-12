
const mysql = require('mysql');
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cetma2019",
  database: "pelki"
});

const app = express()

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors())

//USUARIO

app.post('/auth',  bodyParser.json(), (req, res, next) => {
    const select_query=`SELECT COUNT(*) as total FROM usuario WHERE usuario.username='${req.body.username}' AND usuario.password = SHA('${req.body.password}');`
    con.query(select_query, (err, result) => {
        console.log(result);
     if (err){
           return res.sendStatus(401);
        }else{
            console.log(result[0].total);
            if(result[0].total>0){
                var token = jwt.sign({userID: req.body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                res.send({token});
            }else{
                return res.sendStatus(401);
            }
     }
    });
});

app.get('/users/username', (req, res) => {
    con.query('SELECT username FROM usuario;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/users', (req, res) => {
    con.query('SELECT nombreUsuario, email, usuario, question1, DATE_FORMAT(question2, "%Y-%m-%d") as question2, question3 FROM usuario;', (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/user/add',  bodyParser.json(), (req, res, next) => {
    const INSERT_USER_QUERY = `INSERT INTO usuario(username, password, tipo) VALUES('${req.body.username}',SHA('${req.body.password}'), '${req.body.tipo}');`
    con.query(INSERT_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.sendStatus(401);
        } else {
            return res.send('usuario adicionado con exito')
        }
    })
})

app.put('/user/type', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT tipo FROM usuario WHERE usuario.username = '${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            console.log(resultados);
            return res.json({
                data: resultados
            })
        }
    })
})


app.get('/users/type' , (req, res) => {
  con.query(`SELECT * FROM tipo_usuario;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.post('/maestranza/add',  bodyParser.json(), (req, res, next) => {
      con.query(`SELECT usuario.id FROM usuario WHERE usuario.username='${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            const INSERT_USER_QUERY = `INSERT INTO maestranza(nombre, dir_calle, dir_num, dir_comuna, dir_prov, dir_region, dir_pais, telefono,correo, usuario) VALUES('${req.body.nombre}','${req.body.calle}',${req.body.num},'${req.body.comuna}','${req.body.provincia}','${req.body.region}','${req.body.pais}','${req.body.telefono}','${req.body.correo}','${resultados[0].id}');`
            con.query(INSERT_USER_QUERY, (err, resultados) => {
                if(err) {
                    return res.sendStatus(401);
                } else {
                    return res.send('usuario adicionado con exito')
                }
            })
        }
    })
})

app.post('/cliente/add',  bodyParser.json(), (req, res, next) => {
      con.query(`SELECT usuario.id FROM usuario WHERE usuario.username='${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            const INSERT_USER_QUERY = `INSERT INTO cliente(nombre, dir_calle, dir_num, dir_comuna, dir_prov, dir_region, dir_pais, telefono,correo, usuario) VALUES('${req.body.nombre}','${req.body.calle}',${req.body.num},'${req.body.comuna}','${req.body.provincia}','${req.body.region}','${req.body.pais}','${req.body.telefono}','${req.body.correo}','${resultados[0].id}');`
            con.query(INSERT_USER_QUERY, (err, resultados) => {
                if(err) {
                    return res.sendStatus(401);
                } else {
                    return res.send('usuario adicionado con exito')
                }
            })
        }
    })
})


app.get('/location/region' , (req, res) => {
  con.query(`SELECT * FROM region;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})


app.get('/location/region/provincia' , (req, res) => {
  con.query(`SELECT region.nombre as region, provincia.nombre as provincia FROM region, provincia WHERE provincia.region=region.id;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/location/provincia/comuna' , (req, res) => {
  con.query(`SELECT provincia.nombre as provincia, comuna.nombre as comuna FROM provincia, comuna WHERE comuna.provincia=provincia.id;`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})



app.listen(2001, () => {
    console.log('el servidor está usando el puerto 2001 -')
})