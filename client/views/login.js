Template.login.onCreated(function () {
	this.state = new ReactiveDict()

	this.state.set("isSignUp", false)
})

Template.login.events({
	"click #toggle-sign-up"(e, i) {
		e.preventDefault()

		i.state.set("isSignUp", !i.state.get("isSignUp"))
	},

	"click #login-facebook"(e, i){
		e.preventDefault()
		
		Meteor.loginWithFacebook()
		// logging in with facebook
	},

	"click .submit-form"(e, i){
		e.preventDefault()
		i.$("#auth-form").submit()
		
		// submit the form depending on isSignUp
	},

	"submit #auth-form"(e, i){
		e.preventDefault()

		if(i.state.get("isSignUp")) {

			const {
				email,
				password,
				repeat,
				name,
				address,
				phone
			} = e.target

			if (password.value !== repeat.value){
				return console.error("Passwords must match!")
			}
			Meteor.call("addUser",
				email.value,
				password.value,
				name.value,
				phone.value,
				address.value,
				function(error){
					if (error){
						return console.error(error)
					}
					Meteor.loginWithPassword(
						{email: email.value},
						password.value,
						function(error){
							if (error){
								return console.error(error)
							}
							Meteor.logoutOtherClients()
							FlowRouter.go("/")
						}
					)
				}
			)
		} 
		else {
			const {
				email,
				password
			} = e.target
			Meteor.loginWithPassword(
				{email: email.value},
				password.value,
				function(error){
					if (error){
						return console.error(error)
					}
					Meteor.logoutOtherClients()
					FlowRouter.go("/")
				}
			)
		}
	},
})

Template.login.helpers({
	isSignUp(){
		return Template.instance().state.get("isSignUp")
	}
})