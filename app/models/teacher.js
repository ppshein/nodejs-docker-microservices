'use strict';
module.exports = (sequelize, DataTypes) => {
	const Teacher = sequelize.define('Teacher', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {});
	Teacher.associate = function (models) {
		Teacher.hasMany(models.Student, {
			foreignKey: 'teacherId',
			as: 'students'
		});
	};
	return Teacher;
};