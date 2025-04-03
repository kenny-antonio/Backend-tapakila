const db = require("../models/dbConfig.js");

const postEvent = async (request,response) => {
    try{
        const {title,location,event_date,organizer_id,image_url,category,type} = request.body;

        const req = await db.query('INSERT INTO events (title,location,event_date,organizer_id,image_url,category,type) VALUES ($1,$2,$3,$4,$5,$6,$7)',
            [title,location,event_date,organizer_id,image_url,category,type]);
        response.send(`Event Created : ${req.rows}`);
    }catch(error){
        console.log(error.message);
        
    }
}

const getEvents = async (request,response) => {
    try{
        const req = await db.query('SELECT id,title,location,event_date,organizer_id,image_url,category,type FROM events ORDER BY id ASC');
        response.status(200).send(req.rows);
    }catch(error){
        console.log(error.message);
    }
}

const getOneEvent = async (request,response) => {
    try{
        const id = parseInt(request.params.id);
        const req = await db.query('SELECT id,title,location,event_date,organizer_id,image_url,category,type FROM events WHERE id =$1 ',[id]);
        response.send(req.rows).status(202);
    }catch(error){
        console.log(error.message);
    }
}

const updateEvent = async (request,response) => {
    try{
        const id = parseInt(request.params.id);
        const {title,location,event_date,organizer_id,image_url,category,type} = request.body; 
    
        const req = await db.query('UPDATE events SET title=$1,location=$2,event_date=$3,organizer_id=$4,image_url=$5,category=$6,type=$7 WHERE id=$8',
            [title,location,event_date,organizer_id,image_url,category,type,id]);
        response.status(201).send(`Event updated : ${req.rows}`);
    }catch(error){
        console.log(error.message);
    }
}

const deleteEvent = async (request,response) => {
    try{
        const id = parseInt(request.params.id);

        const req = await db.query('DELETE FROM events WHERE id=$1',[id]);
        response.send("Event deleted").status(202);
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    postEvent,
    getEvents,
    getOneEvent,
    updateEvent,
    deleteEvent
};