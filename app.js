import express from 'express'
import routes from './routes/routes.js'
import bodyParser from 'body-parser'
import { db } from './models/bd.js'
import * as dotenv from 'dotenv' 
dotenv.config()
export default process.env.ACCESS_TOKEN_SECRET;
//console.log(process.env.ACCESS_TOKEN_SECRET)


import * as jwt from 'jsonwebtoken';
// @ts-ignore
const { sign, decode, verify } = jwt;
const app = express()
const port = process.env.port || 8080


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware pour les routes
app.use(routes)



app.listen(port, () => {
console.log(`your listening on ${port}`)
})

