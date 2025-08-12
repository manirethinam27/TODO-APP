const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./modules/modules');
const path = require('path');
const { error } = require('console');
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

mongoose.connect("mongodb+srv://manirethinam2005:mani122005@cluster0.qt2tkwm.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("db connected");
}).catch(err => {
    console.log("db not connected", err);
});



app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('main', { tasks });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks');
    }
});

app.post('/add', async (req, res) => {
    const taskName = req.body.taskName;

    if (!taskName || taskName.trim() === '') {
        return res.redirect('/'); 
    }

    const newTask = new Task({ task: taskName });
    await newTask.save();
    res.redirect('/');
});

app.delete('/delete/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        await Task.deleteOne({ _id: taskId });
        res.redirect('/');
    } catch (err) {
        console.error('Failed to delete task:', err);
        res.status(500).send('Error deleting task');
    }
});

app.listen(port, () => {
    console.log(`run at ${port}`);
});
