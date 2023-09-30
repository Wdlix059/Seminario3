import {Router} from 'express'
import { getEmpleado } from '../controller/empleado.controller.js'
import { CrearEmpleado } from '../controller/empleado.controller.js'
import { ActualizarEmpleado } from '../controller/empleado.controller.js'
import { EliminarEmpleado } from '../controller/empleado.controller.js'
import { getEmpleadoID } from '../controller/empleado.controller.js'
import { BuscarPerfil } from '../controller/empleado.controller.js'
import {  getEmpleadoReporte} from '../controller/empleado.controller.js'

const router = Router()

router.get('/empleado', getEmpleado)
router.get('/empleado/:id', getEmpleadoID)
router.post('/empleado',CrearEmpleado)
router.patch('/empleado/:id',ActualizarEmpleado)
router.delete('/empleado/:id',EliminarEmpleado)
router.get('/empleadoReporte',getEmpleadoReporte)

router.post('/login',BuscarPerfil)

export default router