var async = require('async');

var q = async.queue(function(task, callback){
	console.log(task.name);
	callback();
}, 2);

q.drain = function(){
	console.log('all items have been processed');
};

q.push({name: 'foo'}, function(err) {
	console.log('finished processing foo');
});

q.push({name: 'bar'}, function(err){
	console.log('finished processing bar'+'123');
});

q.push([{name: 'hoang'},{name: 'hai'},{name: 'pham'}], function (err) {
	console.log('finished processing the array');
});

q.unshift({name: 'bar'}, function(err){
	console.log('finished processing bar123');
});
