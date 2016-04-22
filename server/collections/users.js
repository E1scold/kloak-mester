Meteor.methods({
	addUser(email, password, name, address, phone){
		Accounts.createUser({
			email,
			password,
			profile: {
				name,
				phone,
				address
			}
		})
	}
})