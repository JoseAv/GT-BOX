import express from "express"
import { config } from "./env/env.js"



const app = express()


app.listen(config.port, () => console.log('Escuchando en:', config.port))