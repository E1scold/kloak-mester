Template.order.onCreated(function () {
	this.state = new ReactiveDict()

	this.state.set('service-type', undefined)
	this.state.set('create-user', false)

})

Template.order.events({
	'click #toggle-type-spoling'(e, i){
		e.preventDefault()
		i.state.set(
			"service-type", 
			i.state.get("service-type")==="spoling"
			? undefined
			: "spoling"
		)
	},
	'click #toggle-type-inspektion'(e, i){
		e.preventDefault()
		i.state.set(
			"service-type", 
			i.state.get("service-type")==="inspektion"
			? undefined
			: "inspektion"
		)
	},
	'click #toggle-type-eftersyn'(e, i){
		e.preventDefault()
		i.state.set("service-type",
			i.state.get("service-type") === "eftersyn"
			? undefined
			: "eftersyn"
		)
	},
	'click #toggle-create-user'(e, i){
		e.preventDefault()
		i.state.set("create-user", !i.state.get("create-user"))
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