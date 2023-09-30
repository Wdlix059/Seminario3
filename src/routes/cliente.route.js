import {Router} from 'express'
import {getCliente} from '../controller/cliente.controller.js'
import {CrearCliente} from '../controller/cliente.controller.js'
import {ActualizarCliente} from '../controller/cliente.controller.js'
import {EliminarCliente} from '../controller/cliente.controller.js'
import {getClienteID} from '../controller/cliente.controller.js'
import { getClienteReporte } from '../controller/cliente.controller.js'

const cliente = Router()

cliente.get('/cliente',getCliente)
cliente.get('/cliente/:id',getClienteID)
cliente.post('/cliente',CrearCliente)
cliente.patch('/cliente/:id',ActualizarCliente)
cliente.delete('/cliente/:id',EliminarCliente)
cliente.get('/clienteReporte',getClienteReporte)

export default cliente