
import express from 'express'

import empleadoroute from './routes/empleados.route.js'
import clienteroute from './routes/cliente.route.js'
import visitaroute from './routes/visita.route.js'
import indexroute from './routes/index.route.js'
import {PORT} from './config.js'
import cors from 'cors'



const app = express()

//para convertir el body en json
app.use(express.json())

app.use(cors({
    origin:'*'
}));


//metodo de suma
app.use(indexroute)

//importando metodos para empleado
app.use(empleadoroute)

//importando metodos para cliente
app.use(clienteroute)

//importando metodos para cliente
app.use(visitaroute)


app.listen(PORT)
console.log('server corriendo ', PORT)
