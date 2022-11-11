exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}

const {flightModel} =require("../models/Flight");
const shortid = require("shortid");
const moment =require('moment');

const date1 = moment().format('L');
const time1 = moment().format('LT');

//book a flight
exports.bookFlight = async (req, res) =>{
    try {
        
        const {title, price} = await req.body;
        const newFlight = {
            id: shortid(),
            title,
            time: time1,
            price,
            date: date1,
        }
        flightModel.push(newFlight);
        res.status(201).json({
            message: "flight booked",
            newFlight,
        });

    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

//get all flight
exports.getAllFlight = async (req, res) =>{
    try{
        const flights = flightModel;
        if (flights.length === 0){
                res.status(404).json({message: "No booked flight, try booking one!"})    
        }

        res.status(200).json({
            message: "showing all booked Flights",
            flights,
        })
    } catch(err){
        res.status(500).json({message:err.message});
    }
}

//get single flight
exports.getFlight = async (req, res) =>{
    try {
        let id = req.params.id;
        const flight = flightModel.find((flight) => flight.id === id);
        if (flight){
        res.status(200).json({
            message: "flight found",
            flight,            
        } )
        }   else{
            res.status(404).json({message: "flight not found, check the flight id."})
        }

        }
     catch (err) {
        res.status(500).json({message:err.message});
    }
}

//update a flight
exports.updateFlight = async (req, res) =>{
    try {
        let id = req.params.id;

        const flight = flightModel.find((flight) => flight.id === id);
        const {title, price} = await req.body;
        flight.title = title;
        flight.time = time1
        flight.price = price
        flight.date = date1

        console.log(flight)
        res.status(200).json({
            message: "flight updated",
            flight,
        })
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}

//delete a flight
exports.deleteFlight = async (req, res) =>{
    try {
        let id = req.params.id;
        const flight = flightModel.find((flight) => flight.id === id);
        flightModel.splice(flightModel.indexOf(flight), 1);
        res.status(200).json({
            message: "flight deleted",
        });
    } catch (err) {
        res.status(500).json({message:err.message});
    }
}


// {
//     title: "flight to america",
//     time: 1pm,
//     price: 25000,
//     date: ""
// }

