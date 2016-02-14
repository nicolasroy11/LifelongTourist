var app = angular.module('app',
	['ui.router',
	'uiGmapgoogle-maps',
	'ngFileUpload', 
	'ui.bootstrap', 
	'simplePagination', 
	'pageslide-directive', 
	'btford.socket-io',
	'ngStorage',
	'ngResource'
	]);

app.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) 
{

	$stateProvider
	.state('landing',
	{
		url:         '/welcome',
		controller: 'authCtrl',
		views: 
		{
			'': {templateUrl: '../../views/tempLandingPage.html'} ,
			'signup_temp@home': {templateUrl: '../../views/dev_nav.html'},
			'social-temp@home': {templateUrl: '../../views/logged_nav.html'},
			'mid-temp@home': {templateUrl: '../../views/msg_panel.html'},
		},
	})
    .state('home', 
	{
		url: 	'/',
		views: 
		{
			'': {templateUrl: '../../views/home_nav.html'} ,
			'dev-nav@home': {templateUrl: '../../views/dev_nav.html'},
			'logged-nav@home': {templateUrl: '../../views/logged_nav.html'},
			'msg-panel@home': {templateUrl: '../../views/msg_panel.html'},
		}
	})
    .state('home.about',
	{
		url: 	'about',
		abstract: true,
		templateUrl: '../../views/about_nav.html'
	})
	.state('home.about.us',
	{
		url: 	'/us',
		templateUrl: '../../views/about.html',
	})
    .state('home.about.contact',
	{
		url: 	'/contact',
		templateUrl: '../../views/contact.html',
	})
	.state('home.about.legal',
	{
		url: 	'/legal',
		templateUrl: '../../views/legal.html',
	})
	.state('home.about.jobs',
	{
		url: 	'/jobs',
		templateUrl: '../../views/jobs.html',
	})
    .state('home.search', 
	{
		url: 	'roomSearch?n',
		views: 
		{
			'': {
					templateUrl: '../../views/search_nav.html',
				},
			'results@home.search': 
				{
					templateUrl: '../../views/roomSearch.html',
					controller: 'resultsDisplayCtrl',
				},
		}
	})
	.state('home.roomProfile', 
	{
		url:         'roomProfile/:id',
		controller: 'singleRoomCtrl',
		templateUrl: '../../views/roomProfile.html',
		resolve:
		{
			roomInfo: ['QuerySvc', '$stateParams', '$rootScope', function(QuerySvc, $stateParams, $rootScope)
			{
				var rid = $stateParams.id;
				return QuerySvc.populate("room", rid, 'roomie meta.listerID')
				.then(function (response)
		        {
		        	$rootScope.viewedRoom = response;
		        	void 0;
		        	return response;
				});
			}]
		}
	})
	.state('home.roomPost', 
	{
		url:         'roomPost',
		controller: 'roomCtrl',
		templateUrl: '../../views/roomForm.html'
	})
	.state('home.roomie',
	{
		url:         'roomie',
		abstract: true,
		controller: 'roomieCtrl',
		templateUrl: '../../views/roomie_nav.html',
    })
    .state('home.roomie.profile',
	{
		url: 	'/profile',
		abstract: true,
		templateUrl: '../../views/profile_sidenav.html'
    })
	.state('home.roomie.profile.primary',
	{
		url:         '/primary',
		templateUrl: '../../views/roomieForm.html'
    })
    .state('home.roomie.profile.match',
	{
		url:         '/match',
		templateUrl: '../../views/roomiePreferences.html'
    })
    .state('home.roomie.messages',
	{
		url: 	'/messages',
		views: 
		{
			'': {
					templateUrl: '../../views/messages_sidenav.html',
					controller: 'threadsCtrl',
				} ,
		}
    })
	.state('home.roomie.messages.inbox',
	{
		url:         '/inbox',
		controller: 'threadsCtrl',
		templateUrl: '../../views/inbox.html'
    })
    .state('home.roomie.messages.new',
	{
		url:         '/new',
		controller: 'threadsCtrl',
		templateUrl: '../../views/roomiePreferences.html'
    })
    .state('home.roomie.messages.sent',
	{
		url:         '/sent',
		controller: 'threadsCtrl',
		templateUrl: '../../views/sent.html'
    })
    .state('home.touristQuery',
    {
    	url: 'touristQuery',
		templateUrl: '../../views/touristQuery.html',
		controller: 'tripQueryCtrl',
		model: 'tourist'
	})
	.state('home.tripQuery',
    {
    	url: 'tripQuery',
		templateUrl: '../../views/tripQuery.html',
		controller: 'tripQueryCtrl',
		model: 'trip'
	})
	.state('home.threadQuery',
    {
    	url: 'threadQuery',
		templateUrl: '../../views/threadquery.html',
		controller: 'threadQueryCtrl',
		model: 'thread'
	});
    $urlRouterProvider.otherwise('/');

	 uiGmapGoogleMapApiProvider.configure(
	 {
	  	key: 'AIzaSyBS7LbBh49rHVI2qdrZvACM-PqPVIYCHzE',
	  	v: '3.17',
	  	libraries: 'weather,geometry,visualization'
	});
});
