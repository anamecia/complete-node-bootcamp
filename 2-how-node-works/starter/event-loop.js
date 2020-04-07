const fs = require('fs');
const crypto = require('crypto')

const start = Date.now()
process.env.UV_THREADPOOL_SIZE = 2;  // this way we can change the number of threads in the thread pool, which by default are 4
console.log('hello from the top level code');

setImmediate(() => console.log('Immediate 1 finished'));
setTimeout(() => console.log('Timer 1 finished'), 0);

fs.readFile('test-file.txt', () => {
    console.log('I/O finished')
    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);
    setImmediate(() => console.log('Immediate 2 finished'));

    process.nextTick(() => console.log('Process.nextTick'))

    //this code is to heavy for the event loop so it will be sent to the thread pool and the time that it takes to run depends 
    // on how many threads in the thread pool are available 
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {    
        console.log(Date.now()-start,'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'password encrypted')
    })
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        console.log(Date.now()-start,'password encrypted')
    })
});



