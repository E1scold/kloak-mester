Template.registerHelper("profilePicture", function () {
	
	const user = Meteor.user()

	if (
		user &&
		user.services &&
		user.services.facebook &&
		user.services.facebook.id 
	) {
		return `http://graph.facebook.com/${user.services.facebook.id}/picture`
	} else {
		return "/images/noPictureUser.png"
	}

})

Template.registerHelper("allTrue", function(...args) {
	return args.every(function(arg){
		return arg
	})
})

Template.registerHelper("equals", function(a, b) {
	return a===b
})