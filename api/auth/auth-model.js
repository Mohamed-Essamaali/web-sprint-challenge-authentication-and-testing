const db = require('../../data/dbConfig')


const find = ()=>{
    return db('users')
}
const findBy = credential=>{
    return db('users').where(credential).select('id','username','password')
}
const findById = id=>{
    return db('users').where("id",id)
}
const create= credential =>{
    return db('users').insert(credential).then(ids=>findById(ids[0]).first())
}
const remove = id=>{
return db('users').del().where("id",id)
}

module.exports = {find,create,findBy,findById,remove}