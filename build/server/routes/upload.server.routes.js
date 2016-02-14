var formidable = require('formidable');
var util = require('util'); 
var fs   = require('fs-extra'); 

module.exports = function(app)
{
  app.post('/upload', function (req, res){
    var args;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) 
    {
      args = fields;
      void 0;
      void 0;
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    form.on('end', function(fields, files) 
    {
      var temp_path = this.openedFiles[0].path;

      var file_name = this.openedFiles[0].name;

            void 0;
      void 0;
       var new_location = 'uploads/' + args.id + '/';

      fs.copy(temp_path, new_location + file_name, function(err) { 
        if (err) {
          void 0;
        } else {
          void 0
        }
      });
    });
  });
}