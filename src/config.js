import {config} from 'dotenv'

config()


//process objeto global lee las variables de entorno
//PORT ES DEL SERVIDOR
export const PORT = process.env.PORT || 3000


export const DB_HOST=process.env.DB_HOST||'localhost'
export const DB_PORT=process.env.DB_PORT|| 3308
export const DB_USER=process.env.DB_USER|| 'root'
export const DB_PASSWORD=process.env.DB_PASSWORD || 'admin123'
export const DB_DATABASE=process.env.DB_DATABASE || 'proy2'





