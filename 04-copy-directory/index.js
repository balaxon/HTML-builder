const path = require('path');
const fs = require('fs');
const mk = require('fs/promises');
const from = path.join(__dirname+'\\files');
const to = path.join(__dirname+'\\files-copy');
function removefiles(){
  fs.readdir(to, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
      fs.unlink(to+'\\'+file, (err) => {
        if (err) {
          console.error(err)
        }
      })
    })
    }
  })
}
fs.stat(to, function(err) {
    if (!err) {
        /* console.log('Директория есть'); */
        removefiles();
        copy();        
    }
    else if (err.code === 'ENOENT') {
        /* console.log('директории нет'); */
        mk.mkdir(to);
        copy();
    }
});
function copy(){
    fs.readdir(from, (err, files) => {
        if (err)
          console.log(err);
        else {
          files.forEach(file => {
              fs.copyFile(from+'\\'+file, to+'\\'+file, (err) => {
                if (err) throw err;
              });
          })
          console.log('Готово!');
        }
      })
}
