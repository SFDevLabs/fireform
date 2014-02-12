/**
 * Module dependencies.
 */

var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

function compile(str, path) {
    console.log(stylus(str));
    console.log('compiling');
    return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
}

app.configure(function() {

    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    //app.use(require('stylus').middleware(__dirname + '/assets'));

    app.use(stylus.middleware({
        src: __dirname + "/stylus",
        dest: __dirname + "/assets",
        compile: compile
    }));

    app.use(express.static(__dirname + '/assets'));

});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

routes.init(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});