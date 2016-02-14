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
		url: 	'tripSearch?n',
		views: 
		{
			'': {
					templateUrl: '../../views/search_nav.html',
				},
			'results@home.search': 
				{
					templateUrl: '../../views/tripSearch.html',
					controller: 'resultsDisplayCtrl',
				},
		}
	})
	.state('home.tripProfile', 
	{
		url:         'tripProfile/:id',
		controller: 'singleRoomCtrl',
		templateUrl: '../../views/tripProfile.html',
		resolve:
		{
			roomInfo: ['QuerySvc', '$stateParams', '$rootScope', function(QuerySvc, $stateParams, $rootScope)
			{
				var rid = $stateParams.id;
				return QuerySvc.populate("trip", rid, 'tourist meta.listerID')
				.then(function (response)
		        {
		        	$rootScope.viewedRoom = response;
		        	void 0;
		        	return response;
				});
			}]
		}
	})
	.state('home.tripPost', 
	{
		url:         'tripPost',
		controller: 'tripCtrl',
		templateUrl: '../../views/tripForm.html'
	})
	.state('home.tourist',
	{
		url:         'tourist',
		abstract: true,
		controller: 'touristCtrl',
		templateUrl: '../../views/tourist_nav.html',
    })
    .state('home.tourist.profile',
	{
		url: 	'/profile',
		abstract: true,
		templateUrl: '../../views/profile_sidenav.html'
    })
	.state('home.tourist.profile.primary',
	{
		url:         '/primary',
		templateUrl: '../../views/touristForm.html'
    })
    .state('home.tourist.profile.match',
	{
		url:         '/match',
		templateUrl: '../../views/touristPreferences.html'
    })
    .state('home.tourist.messages',
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
	.state('home.tourist.messages.inbox',
	{
		url:         '/inbox',
		controller: 'threadsCtrl',
		templateUrl: '../../views/inbox.html'
    })
    .state('home.tourist.messages.new',
	{
		url:         '/new',
		controller: 'threadsCtrl',
		templateUrl: '../../views/touristPreferences.html'
    })
    .state('home.tourist.messages.sent',
	{
		url:         '/sent',
		controller: 'threadsCtrl',
		templateUrl: '../../views/sent.html'
    })
    .state('home.touristQuery',
    {
    	url: 'touristQuery',
		templateUrl: '../../views/touristQuery.html',
		controller: 'queryCtrl',
		model: 'tourist'
	})
	.state('home.tripQuery',
    {
    	url: 'tripQuery',
		templateUrl: '../../views/tripQuery.html',
		controller: 'queryCtrl',
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
