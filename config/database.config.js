module.exports = {
    
   url : 'mongodb://127.0.0.1:27017/TRACE',
   options : this.options
}

let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    useNewUrlParser : true
  };
 