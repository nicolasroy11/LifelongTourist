angular.module('roomem').factory('socketio', ['socketFactory', function (socketFactory)
{
  return socketFactory();
}]);