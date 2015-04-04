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

module.exports = {
	User: User
}