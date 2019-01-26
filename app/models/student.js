'use strict';
module.exports = (sequelize, DataTypes) => {
	const Student = sequelize.define('Student', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isSuspended: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {});
	Student.associate = function (models) {
		Student.belongsTo(models.Teacher, {
			foreignKey: 'teacherId',
			onDelete: 'CASCADE'
		});
	};
	return Student;
};