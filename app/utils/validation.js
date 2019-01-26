const validator = require('validator');

const isTrue = params => !!params;

exports.commonStudentsValidate = (req, res, next) => {
	const teacher = req.query.teacher;
	var validations = [];
	if (teacher && typeof teacher === 'string') {
		validations.push(teacher && teacher !== '' ? true : false);
		validations.push(validator.isEmail(teacher));

		if (validations.every(isTrue)) {
			next();
		} else {
			res.status(500).json({error: 'Input teacher name went wrong'});
		}
	} else if (teacher) {
		teacher.map((teach) => {
			validations.push(teach && teach !== '' ? true : false);
			validations.push(validator.isEmail(teach));
		})

		if (validations.every(isTrue)) {
			next();
		} else {
			res.status(500).json({error: 'Input teacher name went wrong'});
		}
	} else {
		res.status(500).json({error: 'Input teacher name went wrong'});
	}
}

exports.suspendStudentsValidate = (req, res, next) => {
	const body = req.body;
	var validations = [];
	if (body && body.student) {
		validations.push(body && body.student && body.student !== '' ? true : false);
		validations.push(validator.isEmail(body.student));
		if (validations.every(isTrue)) {
			next();
		} else {
			res.status(500).json({error: 'Input student name went wrong'});
		}
	} else {
		res.status(500).json({error: 'Input student name went wrong'});
	}
}

exports.receiveNotificationValidate = (req, res, next) => {
	const body = req.body;
	var validations = [];
	if (body && body.teacher) {
		validations.push(body.teacher && body.teacher !== '' ? true : false);
		validations.push(validator.isEmail(body.teacher));
		if (validations.every(isTrue)) {
			next();
		} else {
			res.status(500).json({error: 'Input teacher name went wrong'});
		}
	} else {
		res.status(500).json({error: 'Input teacher name went wrong'});
	}
}