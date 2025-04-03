const db = require("../models/dbConfig");

const postReservation = async (request,response) => {
    try{
        const {user_id,ticket_id,total_quantity,status} = request.body;

        const req = await db.query("INSERT INTO reservations (user_id,ticket_id,total_quantity,status) VALUES ($1,$2,$3,$4) ",
            [user_id,ticket_id,total_quantity,status]);
        response.send(`Reservation created: ${req.rows}`);
    }catch(error){
        console.log(error.message);
    }
}

const getReservations = async (request,response) => {
    try{
        const req = await db.query("SELECT id,user_id,ticket_id,total_quantity,status,created_at FROM reservations ORDER BY id ASC");
        response.send(req.rows);
    }catch(error){
        console.log(error.message);
    } 
}

const getOneReservation = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

        const req = await db.query("SELECT id,user_id,ticket_id,total_quantity,status,created_at FROM reservations WHERE id=$1",[id]);
        response.send(req.rows)
    }catch(error){
        console.log(error.message);
    }
}

const updateReservation = async (request,response) => {
    try{
        const id = parseInt(request.params.id);
        const {user_id,ticket_id,total_quantity,status} = request.body;

        const req = await db.query("UPDATE reservations SET user_id=$1,ticket_id=$2,total_quantity=$3,status=$4 WHERE id=$5",[user_id,ticket_id,total_quantity,status,id]);
        response.send(`Reservation updated : ${req.rows}`)
    }catch(error){
        console.log(error.message);
    }
}

const deleteReservation = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

        const req = await db.query("DELETE FROM reservations WHERE id=$1",[id]);
        response.send("Reservation deleted").status(200)
    }catch(error){
        console.log(error.message);
        
    }
}

module.exports = {
    postReservation,
    getReservations,
    getOneReservation,
    updateReservation,
    deleteReservation
}