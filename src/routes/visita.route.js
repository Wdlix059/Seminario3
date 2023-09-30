import {Router} from 'express'
import { getVisita } from '../controller/visita.controller.js'
import { CrearVisita } from '../controller/visita.controller.js'
import { ActualizarVisita } from '../controller/visita.controller.js'
import { EliminarVisita } from '../controller/visita.controller.js'
import { getVisitaID } from '../controller/visita.controller.js'

const visita = Router()

visita.get('/visita',getVisita)
visita.get('/visita/:id',getVisitaID)
visita.post('/visita',CrearVisita)
visita.patch('/visita/:id',ActualizarVisita)
visita.delete('/visita/:id',EliminarVisita)

export default visita