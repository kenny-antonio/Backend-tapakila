const { Router } = require("express");
const { postEvent, getEvents, updateEvent, getOneEvent, deleteEvent} = require("../controllers/EventController.js");
const upload = require('../middlewares/multerConfig');

const event = Router();

event.post('/', upload.single('image'), postEvent); 
event.get('/',getEvents);
event.get('/:id',getOneEvent);
event.patch('/:id', upload.single('image'), updateEvent); 
event.delete('/:id',deleteEvent);


module.exports = event;