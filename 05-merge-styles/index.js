const path = require('path');
const fs = require('fs');
const styles = path.join(__dirname+'\\styles');
const project = path.join(__dirname+'\\project-dist');
const newfile = fs.createWriteStream(path.join(project,'bundle.css'));
fs.readdir(styles, (err, files) => {
    if (err)
        console.log(err);
    else {
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
console.log("Готово!");