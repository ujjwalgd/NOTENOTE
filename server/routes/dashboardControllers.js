const Note = require('../models/Notes');
const mongoose = require('mongoose');
/* dashboard */

exports.dashboard = async (req, res) => {
    const locals = {
        title: 'DashBoard | NOTENOTE',
        description: 'What are we writing today'
    }

    try {

        Note.aggregate([
            {
                $sort: {
                    createAt: -1,
                }
            },
            {
                $match: {
                    user: mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $project: {
                    title: { $substr: ['$title', 0, 30] },
                    body: { $substr: ['$body', 0, 200] }
                }
            }
        ])
            .exec(function (err, notes) {
                Note.count().exec(function (err, count) {
                    if (err) return next();


                    res.render('layouts/dashboard/index', {
                        userName: req.user.firstName,
                        notes,
                        locals,
                        layout: '../views/layouts/dashboard',
                    });

                })
            })

    } catch (error) {
        console.log(error);
    }

    try {
        const notes = await Note.find({});

    } catch (error) {

    }

}

/* for view note */

exports.ViewNote = async (req, res) => {
    const note = await Note.findById({ _id: req.params.id })
        .where({ user: req.user.id }).lean();

    if (note) {
        res.render('layouts/dashboard/view-note', {
            noteID: req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else {
        res.send('something went wrong');
    }
}

/* update note */

exports.UpdateNote = async (req, res) => {
    try {
        await Note.findOneAndUpdate({
            _id: req.params.id
        },
            {
                title: req.body.title,
                body: req.body.body
            }
        ).where({
            user: req.user.id
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

/* for creating new note */

exports.createNewNote = async (req, res) => {
    res.render('layouts/dashboard/create-note', {
        layout: '../views/layouts/dashboard'
    });
}

/* for saving New node */

exports.saveNewNote = async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Note.create(req.body);
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
}

/* delete note */

exports.deleteNote = async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
        res.redirect('/dashboard');
    }
    catch (error) {
        console.log(error);
    }
}
