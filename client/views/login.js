Template.login.onCreated(function () {
	this.state = new ReactiveDict()

	this.state.set("isSignUp", false)
	this.state.set("isLoading", false)
})

Template.login.events({
	"click #toggle-sign-up"(e, i) {
		e.preventDefault()

		i.state.set("isSignUp", !i.state.get("isSignUp"))
	},

	"click #login-facebook"(e, i){
		e.preventDefault()
		i.state.set("isLoading", true)
		Meteor.loginWithFacebook(function(error){
			if (error){
				i.state.set("isLoading", false)
				return console.error(error)
			}
			FlowRouter.go("/")
		})
	},

	"click .submit-form"(e, i){
		e.preventDefault()
		i.$("#auth-form").submit()
		
		// submit the form depending on isSignUp
	},

	"submit #auth-form"(e, i){
		e.preventDefault()
		i.state.set("isLoading", true)
		if(i.state.get("isSignUp")) {
			const {
				email: emailInput,
				password: passwordInput,
				repeat: repeatInput,
				name: nameInput,
				address: addressInput,
				phone: phoneInput
			} = e.target

			if (passwordInput.value !== repeatInput.value){
				i.state.set("isLoading", false)
				return console.error("Passwords must match!")
			}
			Meteor.call("addUser",
				emailInput.value,
				passwordInput.value,
				nameInput.value,
				phoneInput.value,
				addressInput.value,
				function(error){
					if (error){
						i.state.set("isLoading", false)
						return console.error(error)
					}
					Meteor.loginWithPassword(
						{email: emailInput.value},
						passwordInput.value,
						function(error){
							if (error){
								i.state.set("isLoading", false)
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
				email: emailInput,
				password: passwordInput
			} = e.target
			Meteor.loginWithPassword(
				{email: emailInput.value},
				passwordInput.value,
				function(error){
					if (error){
						i.state.set("isLoading", false)
						return console.error(error)
					}
					Meteor.logoutOtherClients()
					FlowRouter.go("/")
				}
			)
		}
	}
})

Template.login.helpers({
	isSignUp(){
		return Template.instance().state.get("isSignUp")
	},
	isLoading(){
		return Template.instance().state.get("isLoading")
	}
})