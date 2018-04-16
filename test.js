var repl = require('repl');
var fs = require('fs');
var test;
var path = "mock/";
var karmaConf = "karma.conf.js";

var r = repl.start({ prompt: '> ', eval: evalCMD, writer: writeCMD });

function evalCMD(cmd, context, filename, callback) {
  callback(null, cmd);
}

function writeCMD(output) {
  var ret = readFile(output);
  if(!ret){
      ret = "arquivo não localizado";
  }
  return ret;
}
//ler os files js
function readFile(output){
    var file = removeQuebraLinha(output);
    var pathMock =  `${path}${file}.json`;
    console.log(pathMock);
    if(existFile(pathMock)){
        var rawdata = fs.readFileSync(pathMock);
        var mock = JSON.parse(rawdata);
        createKarmaFile();
        return mock.name;
    }
    return "";
}

function existFile(file){
    if (fs.existsSync(file)) {
        return true;
    }
    return false;
}

function removeQuebraLinha(output){
    return output.replace(/\n/g, '');
}

function pathMock(file){
    return file;
}


function createKarmaFile(){
    if(!existFile(karmaConf)){
        createFileJS(karmaConf);
    }else {
         fs.appendFileSync(karmaConf, 'sou amigo do bixao');
    }
}

function createFileJS(file){
    var stream = fs.createWriteStream(file);
    stream.once('open', function(fd) {
        stream.write("meu nome é kuririn\n");
        stream.end();
    });
}
