

Template.order.onCreated(function () {
	this.state = new ReactiveDict()

	this.state.set('service-type', undefined)
	this.state.set('create-user', false)
	this.state.set('isLoading', false)

})

Template.order.events({
	'click #toggle-type-fix-sewer'(e, i){
		e.preventDefault()
		i.state.set(
			"service-type", 
			i.state.get("service-type")==="fix-sewer"
			? undefined
			: "fix-sewer"
		)
	},
	'click #toggle-type-review-well'(e, i){
		e.preventDefault()
		i.state.set(
			"service-type", 
			i.state.get("service-type")==="review-well"
			? undefined
			: "review-well"
		)
	},
	'click #toggle-type-review-sewer'(e, i){
		e.preventDefault()
		i.state.set("service-type",
			i.state.get("service-type") === "review-sewer"
			? undefined
			: "review-sewer"
		)
	},
	'click #toggle-create-user'(e, i){
		e.preventDefault()
		i.state.set("create-user", !i.state.get("create-user"))
	},

	'submit #order-form'(e, i){
		e.preventDefault()
		i.state.set('isLoading', true)
		const {
			name: nameInput,
			phone: phoneInput,
			email: emailInput,
			home: homeInput,
			service: serviceInput,
			comments: commentsInput
		} = e.target

		if (i.state.get("create-user")) {
			const {
				password: passwordInput,
				repeat: repeatInput
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
				homeInput.value,
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

		else {

			//only place order & 
		}
	}
})

Template.order.helpers({
	serviceType() {
		const i = Template.instance()
		return i.state.get('service-type')
	},
	createUser() {
		const i = Template.instance()
		return i.state.get('create-user')
	}
})