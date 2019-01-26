'use strict';

const ufinityService = require('../../../services/ufinity.services');

exports.welcomeIndex = (req, res) => {
    res.status(200).send('Hello World');
}

exports.getAllRegisteredStudents = (req, res) => {
    var teachers = [];
    const teacher = req.query.teacher;
    if (typeof teacher === 'string') {
        teachers.push(teacher);
    } else {
        teacher.map((teach) => {
            teachers.push(teach);
        });
    }
    ufinityService.allRegisteredStudents(teachers).then((data) => {
        res.status(200).json(data);
    }).catch((err) => {
        res.status(500).json({error: 'No registered students found ' + err});
    });
};

exports.postRegisteredStudents = function (req, res) {
    const body = req.body;
    ufinityService.registeredStudents(body).then(() => {
        res.status(204).json();
    }).catch((err) => {
        res.status(500).json({error: err});
    });
};

exports.postSuspendStudents = function (req, res) {
    const body = req.body;
    ufinityService.suspendStudents(body).then(() => {
        res.status(204).json();
    }).catch((err) => {
        res.status(500).json({error: err});
    });
};

exports.getRetrieveforNotifications = function (req, res) {
    const body = req.body;
    ufinityService.getRetrieveforNotifications(body).then((students) => {
        res.status(200).json(students);
    }).catch((err) => {
        res.status(500).json({error: err});
    });
};