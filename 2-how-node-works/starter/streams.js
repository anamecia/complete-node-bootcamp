const fs = require('fs');
const server = require('http').createServer(); //there we are requiring the http module and creating a server at the same time 

server.on('request', (req, res) => {
    //Solution 1 
    // this solution it is not very efficient, node needs to load that file entirely into memory and only then can send the data
    // this not only is a problem when the file is too big but also when we have multiply resquests 

    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // })

    //Solution 2: Streams 
    // there the ideia is not read the file and store the data into a variable but is to create a readable stream, then when we 
    //recive each chuck of data we can send it to the client 
    //There is a problem with this solution, the readstream is way faster then the responses being sent to the client which can 
    //cause back pressure

    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chuck => {
    //     res.write(chuck);
    // })
    // readable.on('end', ()=>{
    //     res.end(); // without this the chucks won't be send to the client 
    // })
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not fountd');
    // } )

    //Solution 3 - with the pipe operator
    // the pipe operator fixes the back pressure problem, handles the spead of the data coming in and out 

    const readable = fs.createReadStream('test-file.txt');
    // readableSolution.pipe(writableDestination)
    readable.pipe(res);

})

server.listen(8000, '127.0.0.1', () =>{
    console.log('Listening...')
})