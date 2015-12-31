comments on sources

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
//    base = '/home/ubuntu/workspace/bsecondnodejs/chapter6/public_html',
    base = './public_html',
    pathname;

http.createServer(function(req, res){
    pathname = base + req.url;
    console.log(pathname);
/*    
    fs.exists(pathname, function(exists){
        if(!exists){
            res.writeHead(404);
            res.write('Bad request 404\n');
            res.end();
        }else{
            var type = mime.lookup(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);
            res.statusCode = 200;
            var file = fs.createReadStream(pathname);
            file.on('open', function(){
                file.pipe(res);
            });
            file.on('error', function(err){
                console.log(err);
            });
        }
    }); 
*/    
    fs.stat(pathname, function(err, stats){
        if(err){
            res.writeHead(404);
            res.write('Bad request 404\n');
            res.end();
        }else if(stats.isFile()){
            var type = mime.lookup(pathname);
            console.log(type);
            res.setHeader('Content-Type', type);
            res.statusCode = 200;
            var file = fs.createReadStream(pathname);
            file.on('open', function(){
                file.pipe(res);
            });
            file.on('error', function(err){
                console.log(err);
            });
        }else{
            res.writeHead(403);
            res.write('Directory access is forbidden');
            res.end();
        }
    }); 
}).listen(process.env.PORT);
console.log('Server running at -process.env.PORT');

// https://firstnodejs-brother9.c9users.io/win7iso.txt
// /home/ubuntu/workspace/bsecondnodejs/chapter6/public_html
