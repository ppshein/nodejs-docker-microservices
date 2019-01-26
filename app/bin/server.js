var app = require('../app');

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

exports.exist = () => {
	process.exit();
}