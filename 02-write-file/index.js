const path = require('path');
const fs = require('fs');
const process = require('process');
const { stdout, stdin, exit } = process;
const file = fs.createWriteStream(path.join(__dirname,'text.txt'));
stdout.write('Введите ваше сообщение:\n');
stdin.on('data', data => {
    if(data.toString().trim() === 'exit'){process.exit();}else{file.write(data);}
});
process.on('exit', () => stdout.write('До свидания!'));
process.on('SIGINT', () => {process.exit();});