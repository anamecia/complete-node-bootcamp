//OBSERVER PATTERN 

const EventEmitter = require('events')
const http = require('http')

// it is better practice to create a class at inherits from the module event
class Sales extends EventEmitter{
    constructor(){
        super();    //to give access to all the methos in the EventEmitter class 
    }
}

const myEmitter = new Sales();

//this works as an event listener 
myEmitter.on('newSale', () => {             // this is an observer that observes the emitter for events
    console.log('There was a new sale!')
})

//we can setup multiple listeres for for the same event 
myEmitter.on('newSale', () => {
    console.log('Costumer name: Jonas')
})

myEmitter.on('newSale', (stock) => {
    console.log(`There are now ${stock} items left in stock`);
})

// newSale is the event, and th emit method is like we are click on a button, we can pass argument for listeners to use 
myEmitter.emit('newSale', 9)   // this is the object that emitts the event


/////////////////
const server = http.createServer();

//there we are listening for the request event 
server.on('request', (req, res) => {
    console.log('Request received!');
    console.log(req.url)  // this line is to check why did we had 2 request when we refreshed the page (1 for / and another for the favicon)
    res.end('Request received!'); // to send something back, we can have many listeners for one event but we can only send one response
})

server.on('request', (req, res) => {
    console.log('Another request'); // to send something back 
})

// there we are listening for the close event 
server.on('close', () => {
    console.log('Server closed')
})

// to start the server (the callback is optinal)
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening for requests...')
} )
// when we run the code the program doesn't exit because is waiting for request (there are I/O running in the background)