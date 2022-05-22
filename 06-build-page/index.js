const path = require('path');
const fs = require('fs');
const mk = require('fs/promises');
const styles = path.join(__dirname+'\\styles');
const newfolder = path.join(__dirname+'\\project-dist');
const assets = path.join(__dirname+'\\assets');
const newassets = path.join(newfolder+'\\assets');
const components = path.join(__dirname+'\\components');
const templat = path.join(__dirname+'\\template.html');
function stylestransfom(){
    fs.readdir(styles, (err, files) => {
        if (err)
            console.log(err);
        else {
            const newfile = fs.createWriteStream(path.join(newfolder,'style.css'));
            files.forEach(file => {
                if(file.split('.')[1]=='css'){
                    const read = fs.createReadStream(styles+'\\'+file, 'utf8');
                    read.on('data',(data) => {
                        newfile.write(data);
                    })
                }
          })
        }
    })
}
function createdir(createfolder){
    fs.stat(createfolder, function(err) {
        if (!err) {
        }
        else if (err.code === 'ENOENT') {
            mk.mkdir(createfolder);
        }
    });
}
function copyassets(ass,newass){
    fs.readdir(ass, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
              fs.stat(ass+'\\'+file, (error, stats) => {
                  if(stats.isFile()){
                    fs.copyFile(ass+'\\'+file, newass+'\\'+file, (err) => {
                    });
                  }else{
                    createdir(newass+'\\'+file);
                    copyassets(ass+'\\'+file,newass+'\\'+file);
                  }
              })
          })
        }
      })
}
function createhtml(){
    var html = '';
    const read = fs.createReadStream(__dirname+'\\template.html', 'utf8');
    read.on('data',(data) => {
        html=data;
    fs.readdir(components, (err, files) => {
        if (err)
            console.log(err);
        else {
            const newfile = fs.createWriteStream(path.join(newfolder,'index.html'));
            newfile.write('');
            files.forEach(file => {
                if(file.split('.')[1]=='html'){
                    const read = fs.createReadStream(components+'\\'+file, 'utf8');
                    fs.readFile(components+'\\'+file, 'utf8', (err, data) => {
                        if (err) {
                          console.error(err);
                          return;
                        }
                        html = html.replace('{{'+file.split('.')[0]+'}}',data);
                        fs.writeFile(path.join(newfolder,'index.html'), html, function(error){
                            if(error) throw error;
                        });
                      });            
                }
          })
        }
    })
    })
}

createdir(newfolder);
createdir(newassets);
stylestransfom();
copyassets(assets,newassets);
createhtml();
console.log('Готово!');