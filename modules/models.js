//Model User
var User = sequelize.define('User', {
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
		field: 'email'
	}
});

User.sync();

module.exports = {
	User: User
}