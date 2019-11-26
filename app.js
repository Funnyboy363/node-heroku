const http = required('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.send();
    }
});

server.listen(3000);

console.log('Listening on port 3000');

//All this code should be what you always put into app.js to create a server and make it run. You don't need to put in the 
//Api code everytime though