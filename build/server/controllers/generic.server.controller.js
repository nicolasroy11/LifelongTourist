module.exports = 
{
  get : get,
  post : post,
  put : put,
  remove : remove
}

function exec(query, res, cb)
{
  query.exec(function(err, doc)
  {
    if (err) return res.json(err);
    if (doc)
    {
      return res.json(doc);
    }
  })
}

function get(req, res)
{
  void 0;
  var Model = require('../models/' + req.params.model + '.server.model');
  if (req.query.hasOwnProperty('populate'))
  {
    var populate = req.query.populate;
    delete req.query['populate'];
  }
  if (req.query.hasOwnProperty('select'))
  {
    var select = req.query.select;
    delete req.query['select'];
  }
  var query = Model;
  if (req.hasOwnProperty('query'))
  {
    query = query.where(req.query);
    if (req.query.hasOwnProperty('_id'))
    {
      query  = query.findOne();
    }
    else
    {
      query  = query.find();
    }
  }
  else
  {
    query  = query.find();
  }
  (populate) && (query = query.populate(populate));
  (select) && (query = query.select(select));
  exec(query, res, '1');
}

function post(req,res)
{
  void 0;
  void 0;
  var model = req.body.model,
      _model = require('../models/' + model + '.server.model'),
      Model = new _model(req.body.data);
  void 0;
  Model.save(function(err, doc)
  {
    if (err) return res.json(err);
    void 0;
    if (doc)
    {
      return res.json(doc);
    }
  });
}

function put(req,res)
{
  if (req.body.hasOwnProperty('method') && req.body.method==='delete')
  {
    remove(req, res);
  }
  else
  {
    var model = req.body.model,
    Model = require('../models/' + model + '.server.model'),
    filter = req.body.filter || {},
    action = {},
    options = {},
    query = Model;
    void 0;
    void 0;
    (req.body.hasOwnProperty('push')) && (action.$addToSet = req.body.push);
    (req.body.hasOwnProperty('pull')) && (action.$pull = req.body.pull);
    (req.body.hasOwnProperty('update')) && (action = req.body.update);
      options.multi = true;
      query = query.update(filter, action, options);
    query.exec(
    function(err, doc)
    {
      if (err) return res.json(err);
      if (doc)
      {
        return res.json(doc);
      }
    }
    )
  }
}

function remove(req, res)
{ 
  void 0;
  void 0;
  var model = req.body.model,
    Model = require('../models/' + model + '.server.model'),
    filter = req.body.filter || {},
    query = Model,
    cb = req.body.then;
  query = query.remove(filter);
  query.exec(
    function(err, doc)
    {
      if (err) return res.json(err);
      if (doc)
      {
        return res.json(doc);
      }
    }
  )
}


