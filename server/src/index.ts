import express from "express"
import { config } from "./env/env.js"
import { db } from './config/db/sequelize.js'



const app = express()


app.listen(config.port, () => console.log('Escuchando en:', config.port))