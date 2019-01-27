'use strict';

const q = require('bluebird');
const { Teacher, Student } = require('../models')


exports.allRegisteredStudents = async (teacherIds) => {
    return await findRegisteredStudentsByTeachers(teacherIds).then(formattedStudents);
    function formattedStudents(regStudents) {
        var registered = {};
        const students = regStudents.map(val => val.students.map(student => student.name))[0];
        registered.students = students;
        return registered;
    }
};

exports.registeredStudents = async (registered) => {
    return await findOrCreateTeacher(registered.teacher).then(registeredStudents);
    function registeredStudents(teacher) {
        registered.students.map(student => Student.create({name: student}).then(newStudent => teacher.addStudents(newStudent)));
    }
};

exports.suspendStudents = async (studentId) => {
    return await findStudent(studentId.student).then(suspendStudent);
    function suspendStudent(student) {
        if (student) {
            return student.update({
                isSuspended: true
            });
        } else {
            return {};
        }
    }
};

exports.getRetrieveforNotifications = (body) => {
    const transform = extractInformation(body);
    function getTeacherInformation() {
        return Teacher.findOne({
            where: {
                name: transform.teacher
            },
            include: [{
                model: Student,
                as: 'students'
            }]
        });
    }
    function getStudentsInformation() {
        return Student.findAll({
            where: {
                name: transform.students
            }
        });
    }

    function formattedNotifications(response) {
        var registered = {};
        const byTeacher = response[0] && response[0].students ? response[0].students.map(student =>  student.name) : [];
        const byNotiTeacher = response[1] ? response[1].map(student => student.name) : [];
        registered.recipients = [
            ...new Set([...byTeacher, ...byNotiTeacher])
        ];
        return registered;
    }

    return q.all([getTeacherInformation(), getStudentsInformation()]).then(formattedNotifications);
};

var findStudent = (studentId) => {
    return Student.findOne({
        where: {
            name: studentId
        }
    });
};

var findOrCreateTeacher =(teacherIds) => {
    return Teacher.findOrCreate({
        where: {
            name: teacherIds
        }
    }).spread((teacher) => teacher);
};

var findRegisteredStudentsByTeachers = (teacherIds) => {
    return Teacher.findAll({
        where: {
            name: teacherIds
        },
        include: [{
            model: Student,
            as: 'students'
        }]
    });
};

var extractInformation = (body) => {
    var searchObject = {};
    const studentIds = body.notification.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    searchObject.teacher = body.teacher;
    searchObject.students = studentIds;
    return searchObject
}