angular.module('app').factory('socketio', ['socketFactory', function (socketFactory)
{
  return socketFactory();
}]);