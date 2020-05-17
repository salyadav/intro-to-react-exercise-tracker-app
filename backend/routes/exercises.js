const router = require('express').Router();
let Exercises = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercises.find().then(exercises => { //Exercise.find is a mongoose command
        res.json(exercises);
    }).catch(err => {
        res.status(400).json('Error: ' + err);
    });
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); 
    const date = Date.parse(req.body.date);

    const newExercise = new Exercises({
        username,
        description, 
        duration,
        date
    });

    newExercise.save().then(() => {
        res.json('Exercise logged!');
    }).catch(err => {
        res.status(400).json('Error: ' + err);
    });
});

router.route('/delete/:id').delete((req, res) => {
    Exercises.findByIdAndDelete(req.params.id).then(() => {
        res.json('Exercise deleted.');
    }).catch(err => {
        res.status(400).json('Error: ' + err);
    });
});

router.route('/update/:id').post((req, res) => {
    Exercises.findById(req.params.id).then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save().then(() => {
            res.json('Exercise updated.');
        }).catch(err => {
            res.status(400).json('Error: ' + err);
        });
    }).catch(err => {
        res.status(400).json('Error: ' + err);
    });
});

module.exports = router;