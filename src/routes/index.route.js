import {Router} from 'express'

import{ping} from '../controller/ping.controller.js'


const router = Router()

router.get('/ping', ping);

export default router