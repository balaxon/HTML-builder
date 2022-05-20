const path = require('path');
const fs = require('fs');
const dir = path.join(__dirname,'secret-folder');
var name = '';
var ext = '';
fs.readdir(dir, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.stat(dir+'\\'+file, (error, stats) => {
            if(stats.isFile()){
                name = file.split('.')[0];
                ext = file.split('.')[1];
                console.log(name+' - '+ext+' - '+(stats.size/1000)+'kb');
            }
        });
      })
    }
  })