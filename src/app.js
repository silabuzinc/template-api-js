import express from "express";
import cors from "cors";
import connect from "./index";
var session = require('express-session');

//connect();
export const app = express();

var memoryStore = new session.MemoryStore();
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }))
const keycloak = require('./config/keycloak').initKeycloak(memoryStore);
app.use(keycloak.middleware());

app.use(cors());
app.use(express.json());

const keycloak2 = require('./config/keycloak').getKeycloak();

var router = express.Router();

router.get('/anonimo', function(req, res){
    res.send("Hola anonimo");
});

router.get('/user', keycloak2.protect('user'), function(req, res){
    res.send("hola usuario");
})

app.use(router)

const port = 3005;

app.listen(port, () => console.log(`Server init in localhost:${port}`));