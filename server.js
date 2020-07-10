
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
        if (err){
            console.log(err);
            return res.sendStatus(401);
        }else{
            if(result[0].total>0){
                con.query(`SELECT tipo  FROM usuario WHERE usuario.username='${req.body.username}' AND usuario.password = SHA('${req.body.password}');`, (err, resultados) => {
                    if(err) {
                        return res.sendStatus(401);
                    } else {
                        var token = jwt.sign({userID: req.body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                        res.send({'token': token, 'tipo': resultados[0].tipo });

                    }
                })
            }else{
                return res.sendStatus(401);    
            }
        }
    })
});


/*app.post('/auth',  bodyParser.json(), (req, res, next) => {
    const select_query=`SELECT tipo  FROM usuario WHERE usuario.username='${req.body.username}' AND usuario.password = SHA('${req.body.password}');`
    con.query(select_query, (err, result) => {
     if (err){
            console.log(err);
           return res.sendStatus(401);
        }else{
            if(result[0].tipo != ''){
                var token = jwt.sign({userID: req.body.username}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
                res.send({'token': token, 'tipo': result[0].tipo });
            }else{
                return res.sendStatus(401);
            }
     }
    });
});*/

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


app.put('/user/image/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE usuario SET usuario.imagen = '${req.body.image}' WHERE usuario.username = '${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/user/type', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT tipo FROM usuario WHERE usuario.username = '${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})



/*
INFO PERFIL
*/
app.put('/user/maestranza/info', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT * FROM usuario, maestranza WHERE usuario.id=maestranza.usuario AND usuario.username='${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/user/cliente/info', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT * FROM usuario, cliente WHERE usuario.id=cliente.usuario AND usuario.username='${req.body.username}';`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

/*
Tipos
*/

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

/*
MAESTRANZA
*/

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

app.put('/maestranza/correo/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE maestranza SET maestranza.correo = '${req.body.correo}' WHERE maestranza.usuario = ${req.body.username};`, (err, resultados) => {
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

app.put('/maestranza/telefono/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE maestranza SET maestranza.telefono = '${req.body.telefono}' WHERE maestranza.usuario = ${req.body.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/maestranza/direccion/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE maestranza SET maestranza.dir_calle = '${req.body.dir_calle}', maestranza.dir_num = '${req.body.dir_num}' WHERE maestranza.usuario = ${req.body.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            
            return res.json({
                data: resultados
            })
        }
    })
})



/*
CLIENTE
*/

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

app.put('/cliente/correo/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE cliente SET cliente.correo = '${req.body.correo}' WHERE cliente.usuario = ${req.body.username};`, (err, resultados) => {
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

app.put('/cliente/telefono/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE cliente SET cliente.telefono = '${req.body.telefono}' WHERE cliente.usuario = ${req.body.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.put('/cliente/direccion/update', bodyParser.json(), (req, res, next) => {
    con.query(`UPDATE cliente SET cliente.dir_calle = '${req.body.dir_calle}', cliente.dir_num = '${req.body.dir_num}' WHERE cliente.usuario = ${req.body.username};`, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            
            return res.json({
                data: resultados
            })
        }
    })
})



/*
LOCATION
*/
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

/*
Requerimiento
*/
app.put('/requerimiento', bodyParser.json(), (req, res, next) => {
    con.query(`SELECT requerimiento.id as id, requerimiento.servicio as servicio, requerimiento.img as imagen, requerimiento.cliente as cliente, requerimiento.maestranza as maestranza, requerimiento.fecha_creacion as fecha, requerimiento.estado as estado 
        FROM usuario, cliente, requerimiento WHERE usuario.id=cliente.usuario AND usuario.username='${req.body.username}' AND requerimiento.cliente=cliente.id;`, (err, resultados) => {
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