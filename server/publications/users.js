Meteor.publish(undefined, function () {
	if (!this.userId)
		return this.ready()

	return Meteor.users.find({_id: this.userId}, 
		{fields: {
		"services.facebook.email": 1,
		"services.facebook.id": 1,
		"services.facebook.link": 1,
		"services.facebook.gender": 1
	}})
})