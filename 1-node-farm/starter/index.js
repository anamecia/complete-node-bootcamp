// it requires the file system module (gives access to functions to read, writte data, etc)
const fs = require('fs');
//module that gives us network capabilities
const http = require('http');
//to check the url
const url = require('url');

const replaceTemplate = require('./modules/replaceTemplate');

//// FILES /////////////////////////

//Blocking, synchronus way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated at ${Date.now()}`;
// fs.writeFileSync('./txt/output.text', textOut);
// console.log('File written');

// //Non-blockin, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('ERROR!');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('The file has been written')
//             });
//         });
//     });
// });

// console.log('Will read file!');

//// SERVER /////////////////////////

// the file gets read only once at the beginning so it not not matter if a blocking code
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

// __dirname represents the folder where the file is currently located, we cannot use this approach when it comes to the require function
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// this functions is called everytime that there is a request, so we shouldn't have sync functions inside
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const pathName = req.url;

  //Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);

    //Product page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

    //Not Found page
  } else {
    res.writeHead(404, {
      // the headers much be setup before the response to be sent
      'Content-type': 'text/html', // the browser excepts to recive html
      'my-own-header': 'hello world' // we can add custom headers
    });
    res.end('<h1>Page not found</h1>'); // beacuse browser is excepting the response content to be html
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listering for requests on port 8000!');
});
// when we run this code the app keeps running instead of leaving straigth away, this is because of the event loop
