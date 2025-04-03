const { Router } = require("express");
const { postEvent, getEvents, updateEvent, getOneEvent, deleteEvent} = require("../controllers/EventController.js");

const event = Router();

event.post('/',postEvent);
event.get('/',getEvents);
event.get('/:id',getOneEvent);
event.patch('/:id',updateEvent);
event.delete('/:id',deleteEvent)

module.exports = event;