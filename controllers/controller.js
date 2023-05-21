
import db from '../models/bd.js'
import { error, success } from '../functions.js'

// recuperation  tous les users
const getAll = (req, res) => {
    if (req.query.max != undefined && req.query.max > 0) {
        db.query('select * from users LIMIT 0, ?', [req.query.max], (err, result) => {
            if (err) {  res.json(error(err.message)
                ) } else {  res.json(success(result)) }
        })
    } else if (req.query.max != undefined) {
        res.json(error('error : wrong value '))
    } else {
        db.query("select * from users", (err, result) => {
            if (err) { res.json(error(err.message)) } else {
                res.status(201).json(success(result))
            }
        })
    }

}
// recupéré un users avec son ID
const getOne = (req, res) => {
    db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.json(error(err.message))
        } else {
            if (result[0] != undefined) { res.json(success(result[0])) } else {
            res.status(201).json(error('error : wrong id '))}
        }
    
    })

}
// ajout d'un new users +  verification si le nom user est deja exist ou non
// si n'exist pas on ajout un new user et ensuite on recupere son id 
const createOne = (req, res) => {
    let {LastName, FirstName, email, password, role} = req.body
    if (req.body.LastName) {
        db.query('SELECT * FROM users WHERE LastName = ?', [LastName], (err, result) => {
            if (err) { res.json(error(err.message)) } else {
                if (result[0] != undefined) { res.json(error(' the name is already taken ')) } else {
                    db.query('INSERT INTO users(id, LastName, FirstName, email, password, role) VALUES(?, ?, ?, ?, ?, ?)', [null, LastName, FirstName, email, password, role], (err, result) => {
                        //console.log(result)
                        if (err) {
                            res.json(error(err.message))
                        } else {
                            db.query('SELECT * FROM users WHERE LastName = ?', [LastName], (err, result) => {
                                if (err) { res.json(error(err.message)) } else {
                                    res.status(201).json(success({
                                    
                                        id: result[0].id,
                                        LastName: result[0].LastName,
                                        FirstName: result[0].FirstName,
                                        email: result[0].email,
                                        password: result[0].password,
                                        role: result[0].role
                                    }))
                                }
                            
                            })
                        }
                    
                    })
                }
            
            }
        
        })
    } else { res.json(error(' no name value'))}

}
// modifier un user 
const updateOne = (req, res) => {
    if (req.body.LastName) {
        db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
            if (err) { res.json(error(err.message)) } else {
                if (result[0] != undefined) {
                    db.query('SELECT * FROM  users WHERE LastName = ? AND id!= ? ', [req.body.LastName, req.params.id], (err, result) => {
                        if (err) {res.json(error(err.message))
                        
                        } else {
                            if (result[0] != undefined) {
                                res.json(error(' same name '))
                            } else {
                                db.query('UPDATE users SET LastName = ? WHERE  id = ?', [req.body.LastName, req.params.id], (err, result) => {
                                    if (err) {
                                        res.json(error(err.message))
                                    } else {
                                        res.json(success(true))
                                    }
                                
                                })
                            
                            }
                        }
                    })
                } else {
                    res.json(error('wrong id'))
                }
            }
        })
    
    }else{ res.json(error('no name value '))}


}
// supprimer un user
const deleteOne = (req, res) => {
    db.query(' SELECT * FROM users WHERE id = ?', [req.params.id], (err, result) => {
        if (err) { res.json(error(err.message)) } else {
            if (result[0] != undefined) {
                db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
                    if (err) {res.json(error(err.message))
                    } else {
                        res.json(success(true))
                    }
                })
            }else{ res.json(error('wrong id '))}
        }
    })
}



export { getAll, getOne, createOne, updateOne, deleteOne }