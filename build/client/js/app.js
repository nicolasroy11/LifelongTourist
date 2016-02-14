// The "hashchange" event is fired when a page href is fired
window.addEventListener('hashchange', function(){
	//console.log('Hash changed: ' + window.location.hash);

	// Act on a hash change. remember, hashes aren't actual
	// file or folder locations, just virtual locations.
	// That means that even there is no <div> with the 
	// id matching that <a> tag, clicking on it still
	// "takes you" to that hash location in the url space
	// without there being any page change. Below is an
	// example of a hash change to '#/bookmark/whatever'
	// triggering a console message output. The fact that
	// there are slashes in the hash name makes no dif
	// It's just a string. It doens't identify a location
	// in the strictest sense.
	if (window.location.hash === '#/bookmark/whatever')
	{
		//console.log('whatever you!');
	}
});