
import db from "../models/bd.js";
import { error, success } from "../functions.js";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { env } from 'node:process'
import * as dotenv from "dotenv";
dotenv.config();
import { hashSync , genSaltSync, compareSync} from "bcrypt"
const { sign, decode, verify } = jwt;
import { createOne  } from "../controllers/controller.js"

// creation de user
const createUser = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createOne(body, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: 0,
                message: "Database connection error"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
};




// login
const login = (req, res) => {

    const { email, password } = req.body;

db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
        if (err) {
        console.log(err);
            res.status(500).json({ msg :  'Error logging in.'});
      // @ts-ignore
        } else if (results.length=== 0) {
            res.status(401).json({ msg: 'Invalid password or email.' });
        } else {
        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
            // @ts-ignore
            const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ msg: 'Invalid password or email .' });
        }
        }
    }
);
}

const me = (req, res) => {
    res.send(req.user);
}

export  { login, me }