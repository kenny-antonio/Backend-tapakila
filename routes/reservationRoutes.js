const { Router } = require("express");
const { postReservation, getReservations, getOneReservation, updateReservation, deleteReservation } = require("../controllers/ReservationController");

const reservation = Router();

reservation.post("/",postReservation);
reservation.get("/",getReservations);
reservation.get("/:id",getOneReservation);
reservation.patch("/:id",updateReservation);
reservation.delete("/:id",deleteReservation);

module.exports = reservation;