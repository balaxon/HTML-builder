const path = require('path');
const fs = require('fs');
const read = fs.createReadStream(path.join(__dirname, './text.txt'), 'utf8');
read.on('data',(data) => {
    console.log(data.toString());
})