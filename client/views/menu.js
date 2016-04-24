Template.menu.events({
	"click #log-in"(e, i) {
		e.preventDefault()

		FlowRouter.go('/login')
	},
	"click #log-out"(e, i) {
		e.preventDefault()
		console.log(Meteor.user())
		Meteor.logout(function(error){
			if (error)
				return console.log(error)
			else {
				FlowRouter.go("/")
			}
		})
	}
})