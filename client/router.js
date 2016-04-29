BlazeLayout.setRoot('body')

FlowRouter.route('/',{
	name:'home',
	action() {
		BlazeLayout.render('layout',{page: 'home'})
	}
})

FlowRouter.notFound={
	name:'notFound',
	action() {
		BlazeLayout.render('layout',{page: 'notFound'})
	}
}

FlowRouter.route('/contact',{
	name:'contact',
	action() {
		BlazeLayout.render('layout',{page: 'contact'})
	}
})

FlowRouter.route('/login',{
	name:'login',
	action() {
		BlazeLayout.render('layout',{page: 'login'})
	}
})

FlowRouter.route('/userPage',{
	name:'userPage',
	action() {
		BlazeLayout.render('layout',{userPage: 'userPage'})
	}
})

FlowRouter.route('/order',{
	name:'order',
	action() {
		BlazeLayout.render('layout',{page: 'order'})
	}
})