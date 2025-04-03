const db =require("../models/dbConfig.js");

const postUser = async (request,response) => {
    try{
        const {name,email,password} = request.body;

    const req = await db.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3) ',[name,email,password]);
    response.send(`User created : ${req.rows}`);
    }catch(error){
        console.log(error.message);
    }
}

const getUsers = async (request,response) => {
    try{
        const req = await db.query('SELECT id,name,email,password FROM users order by id ASC');
        response.status(200).json(req.rows);
    }catch(error){
        console.log(error.message);
    }
}

const getOneUser = async (request,response) => {
    try{
        const id = parseInt(request.params.id)
    
    const req = await db.query('SELECT id,name,email,password FROM users WHERE id = $1',[id]);
        response.status(201).json(req.rows);
    }catch(error){
        console.log(error.message);
    }
}

const updateUser = async (request,response) => {
    try{
        const id = parseInt(request.params.id);
    const {name,email,password} = request.body;

    const req = await db.query('UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4',[name,email,password,id]);
        response.status(201).send(`User updated : ${req.rows}`);
    }catch(error){
        console.log(error.message);
    }
}

const deleteUser = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

    const req = await db.query('DELETE FROM users WHERE id=$1',[id]);
        response.status(201).send(`User deleted with ID : ${req.rows[0].id}`);
    }catch(error){
        console.log(error.message);
    }
}

module.exports= {getUsers,getOneUser,postUser,deleteUser,updateUser};