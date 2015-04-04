module.exports = function(app){

	var Common = require('../common.js')(app);

	var User = Common.sequelize.define('User', {
		id: {
			type: Sequelize.INTEGER,
			field: 'id_user',
			autoIncrement: true,
			primaryKey: true
		},
		firstName: {
			type: Sequelize.STRING,
			field: 'first_name'
		},
		lastName: {
			type: Sequelize.STRING,
			field: 'last_name'
		},
		email:{
			type: Sequelize.STRING,
			field: 'email',
			unique: true
		},
		password:{
			type: Sequelize.STRING(40),
			field: 'password'
		},
		createdAt: {
			type: Sequelize.DATE,
			field: 'created_at'
		},
		updatedAt: {
			type: Sequelize.DATE,
			field: 'updated_at'
		}
	});

	return User;
}