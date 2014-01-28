var connect = require('connect'),
    nib = require('nib'),
    fs = require('fs'),
    stylus = require('stylus'),
    jade = require('jade'),
    connect = require('connect'),
    http = require('http');

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
    port = process.argv[2] || 8000;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");
// fs.readFile('/Users/sirpunchallot/fireform/app/index2.jade', 'utf8', function(err, str) {


//     console.log(__dirname);

//     //console.log(stylus(str).use(nib()));

//     var fn = jade.compile(str, {
//         filename: '/Users/sirpunchallot/fireform/app/index2.jade'
//     });
//     var htmlOutput = fn({
//         maintainer: {
//             name: 'Forbes Lindesay',
//             twitter: '@ForbesLindesay',
//             blog: 'forbeslindesay.co.uk'
//         }
//     });

//     return

//     stylus(str)
//         .set('filename', 'nesting.css')
//         .include(__dirname + '/css')
//         .render(function(err, css) {

//             console.log(err);


//             fs.writeFile("/Users/sirpunchallot/fireform/app/css/normalize.css", css, function(err) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log("The file was saved!");
//                 }
//             });

//         });





// });






// Require
var watchr = require('watchr');

// Watch a directory or file
watchr.watch({
    paths: [__dirname],
    listeners: {
        log: function(logLevel, b, c) {

            //console.log(b.match("Watch triggered on: "));
            //console.log(b.match(" for event error"));

            if (b.match("Watch triggered on: ") !== null) {
                var file = b.replace("Watch triggered on: ", "").replace(" for event error", "");
                console.log(true);
                fileParse(file);
            }


        },
        error: function(err) {
            // console.log('an error occured:', err);
        },
        watching: function(err, watcherInstance, isWatching) {
            if (err) {
                console.log("watching the path " + watcherInstance.path + " failed with error", err);
            } else {
                //     console.log("watching the path " + watcherInstance.path + " completed");
            }
        },
        change: function(changeType, filePath, fileCurrentStat, filePreviousStat) {
            console.log('change:', filePath.match(/\.([^\.]+)$/)[0]);

        },
        next: function(err, watchers) {


            // if (err) {
            //     return console.log("watching everything failed with error", err);
            // } else {
            //     console.log('watching everything completed', watchers);
            // }

            // Close watchers after 60 seconds
            // setTimeout(function() {
            //     var i;
            //     console.log('Stop watching our paths');
            //     for (i = 0; i < watchers.length; i++) {
            //         watchers[i].close();
            //     }
            // }, 60 * 1000);
        }
    }

});

var fileParse = function(filePath) {
    //console.log('a change event occured:', arguments);

    console.log('fileparse:', filePath.match(/\.([^\.]+)$/)[0]);
    var fileEnd = filePath.match(/\.([^\.]+)$/)[0];


    if (fileEnd === ".styl") {


        console.log(filePath);

        fs.readFile(filePath, 'utf8', function(err, str) {



            stylus(str)
                .set('filename', filePath)
                .include(__dirname + '/css')
                .render(function(err, css) {

                    console.log(css);

                    console.log(err);

                    newCSSpathfilePath = filePath.slice(0, -5).concat('.css')

                    console.log('writeAttempt', newCSSpathfilePath, css);

                    fs.writeFile(newCSSpathfilePath, css, function(err) {
                        console.log('write', newCSSpathfilePath);

                        if (err) {
                            console.log(err);
                        } else {
                            console.log("The file was saved!");
                        }
                    });



                });




        });


    } else if (fileEnd === ".jade") {


        fs.readFile(filePath, 'utf8', function(err, str) {

            console.log(filePath);
            console.log(str);

            var fn = jade.compile(str, {
                filename: filePath
            });
            var htmlOutput = fn({
                maintainer: {
                    name: 'Forbes Lindesay',
                    twitter: '@ForbesLindesay',
                    blog: 'forbeslindesay.co.uk'
                }
            });


            newHTMLpathfilePath = filePath.slice(0, -5).concat('.html');


            fs.writeFile(newHTMLpathfilePath, htmlOutput, function(err) {

                if (err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });





        });





    }




}