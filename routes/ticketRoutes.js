const { Router } = require("express");
const { postTicket, getTickets, getOneTicket, updateTicket, deleteTicket} = require("../controllers/TicketController.js");

const ticket = Router();

ticket.post('/',postTicket);
ticket.get('/',getTickets);
ticket.get('/:id',getOneTicket);
ticket.patch('/:id',updateTicket);
ticket.delete('/:id',deleteTicket);

module.exports = ticket;