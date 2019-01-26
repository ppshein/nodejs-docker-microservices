'use strict';

const express = require('express'),
    controller = require('./ufinity.controller'),
    validator = require('../../../utils/validation'),
    router = express.Router();

router.get('/', controller.welcomeIndex);
router.get('/commonstudents', validator.commonStudentsValidate, controller.getAllRegisteredStudents);
router.post('/register', controller.postRegisteredStudents);
router.post('/suspend', validator.suspendStudentsValidate, controller.postSuspendStudents);
router.post('/retrievefornotifications', validator.receiveNotificationValidate, controller.getRetrieveforNotifications);

module.exports = router;
