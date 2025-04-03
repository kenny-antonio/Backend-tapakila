const db = require("../models/dbConfig.js");

const postTicket = async (request,response) => {
    try{
    const {event_id,type,price,quantity,buying_limit,is_active} = request.body;

    const req = await db.query('INSERT INTO tickets (event_id,type,price,quantity,buying_limit,is_active) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
        [event_id,type,price,quantity,buying_limit,is_active]);
        const data = req.rows[0].type;
        response.send(`Ticket created : ${data}`);
    }catch(error){
        console.log(error.message);
    }
}

const getTickets = async (request,response) => {
    try{
        const req = await  db.query('SELECT id,event_id,type,price,quantity,buying_limit,is_active,created_at FROM tickets ORDER BY id ASC',)
        response.send(req.rows).status(200);
    }catch(error){
        console.log(error.message);
    }
}


const getOneTicket = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

    const req = await db.query('SELECT id,event_id,type,price,quantity,buying_limit,is_active,created_at FROM tickets WHERE id=$1',[id]);
    response.send(req.rows).status(200)
    }catch(error){
        console.log(error.message);
    }
}


const updateTicket = async (request,response) => {
    try{
        const id = parseInt(request.params.id);
        const {event_id,type,price,quantity,buying_limit,is_active} = request.body;

        const req = await db.query('UPDATE tickets SET event_id=$1, type=$2, price=$3, quantity=$4, buying_limit=$5, is_active=$6 WHERE id = $7',
            [event_id,type,price,quantity,buying_limit,is_active,id]);
        response.send(`Ticket updated : ${req.rows}`).status(201);
    }catch(error){
        console.log(error.message);
    }
}


const deleteTicket = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

        const req = await db.query('DELETE FROM tickets WHERE id=$1',[id]);
        response.send(`Ticket Deleted`).status(201);
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    postTicket,
    getTickets,
    getOneTicket,
    updateTicket,
    deleteTicket,
}