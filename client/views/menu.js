Template.menu.events({
	"click #log-in"(e, i) {
		e.preventDefault()

		FlowRouter.go('/login')
	},
	"click #log-out"(e, i) {
		e.preventDefault()
		console.log(Meteor.user())
		Meteor.logout()
	}
})