Meteor.methods({
	addUser(email, password, name, home, phone){
		Accounts.createUser({
			email,
			password,
			profile: {
				name,
				phone,
				home
			}
		})
	}
})