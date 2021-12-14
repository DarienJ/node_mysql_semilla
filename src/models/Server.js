import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import usuarios from '../routes/usuarios.js';

//test
import llamar from '../controllers/test.js';
//controller

class Server {
  constructor() {
    this.port = process.env.PORT;

    this.app = express();

    this.conecBD();

    this.midlewares();

    this.routes();
  }

  routes() {
    this.app.use('api/usuario', usuarios);
  }

  conecBD() {
    const conecction = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });
    
    //Routers
    //let texto = 'Funcionando';
    this.app.get('/api/', llamar);

    this.app.get('/api/usuarios/get', (req, res) => {
      const sql = 'SELECT * FROM usuarios';

      conecction.query(sql, (err, results)=> {
        if (err) throw err;
        if (results.length > 0) {
          res.json({
            results
          });
        } else {
          const msg = 'No hay resultados';
          res.json({
            msg
          });
        }
      });
    });

    this.app.post('/api/usuarios/post', (req, res) => {
      const sql = 'INSERT INTO pruebas.usuarios SET ?';

      const usuariosObj = {
        nombre: req.body.nombre,
        email: req.body.email,
        clave: req.body.clave
      }

      console.log(usuariosObj);

      conecction.query(sql, usuariosObj, err => {
        if (err) throw err; 
        let msg = 'Nuevo usuario agregado'
        res.json({
          msg
        });
      });
    });

    conecction.connect((err) => {
      if (err) throw err;
      console.log('Conectado al servidor');
    })
  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  listen() {
    this.app.listen(this.port,()=>{
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    })
  }
}

export {Server}