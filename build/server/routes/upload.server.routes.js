// upload dependencies
var formidable = require('formidable');
var util = require('util'); // for uploads
var fs   = require('fs-extra'); // for uploads

module.exports = function(app)
{
  // Image upload route
  app.post('/upload', function (req, res){
    var args;
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) 
    {
      args = fields;
      console.log("args: ");
      console.log(args);
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      //res.redirect('/#/primary');
    });

    form.on('end', function(fields, files) 
    {
      /* Temporary location of our uploaded file */
      var temp_path = this.openedFiles[0].path;
      
      /* The file name of the uploaded file */
      var file_name = this.openedFiles[0].name;
      //var file_name = '_12345678'
      
      console.log("args: ");
      console.log(args);
      /* Location where we want to copy the uploaded file */
       var new_location = 'uploads/' + args.id + '/';

      fs.copy(temp_path, new_location + file_name, function(err) { 
        if (err) {
          console.error(err);
        } else {
          console.log("upload success!")
        }
      });
    });
  });
}