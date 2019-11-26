const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// The different methods
// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
 { id: 1, name: 'Physics'},
 { id: 2, name: 'History'},
 { id: 3, name: 'Web Languages'},
 { id: 1, name: 'Biology'},
 { id: 2, name: 'Aviation'},
 { id: 3, name: 'Digital Cinema'},
];


app.get('/api/courses', (req, res) => {
    res.send([courses]);
});
// the instance of api in the get is a part of making the api. putting the correct syntax in res.send will be important
// in setting up the actual api. make sure to type local 3000/api/courses to view the api array


app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1, 
    name: req.body.name};
  courses.push(course);
  res.send(course);
});
// On postman, add new name of course. The above code is what makes it possible.


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //The logic to bring up the course individually
 if (!course) return res.status(404).send('The course with the given ID was not found.');  // 404 instance
const { error } = validateCourse(req.body);
if (error) return res.status(400).send(error.details[0].message);
course.name = req.body.name;
res.send(course);
});



// removes the object from the array
    app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id)); //The logic to bring up the course individually
    if (!course) return res.status(404).send('The course with the given ID was not found.');  // 404 instance
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()};
        return Joi.validate(course, schema);
};
//This is a validator using npm Joi, which apparently is deprecated

app.get('/api/courses/:id', (req, res) => {
 const course = courses.find(c => c.id === parseInt(req.params.id)); //The logic to bring up the course individually
 if (!course) return res.status(404).send('The course with the given ID was not found.');  // 404 instance
 res.send(course);  // sends the request to the user
});

//ANOTHER OPTION
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});



app.get('/', (req, res) => {
    res.send('I am a sentient being now. The machines will rise with power.');
});
// The app.get will print out text or html on the actual screen

// PORT 
const port = process.env.PORT || 3000;
// Something to consider. In the command prompt, if you type export PORT=5000 and then node index.js it will start the 
//server on port 5000


app.listen(port, () => console.log(`Listening on port ${port}...Welcome to the express js learning. Make sure to pay attention to everything and not get lost`));
// The app.listen will print the text to the command prompt or gitbash

