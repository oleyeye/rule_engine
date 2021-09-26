const fs = require('fs');

function main() {
    const source = fs.readFileSync(__dirname + '/package.json').toString('utf-8');
    const sourceObj = JSON.parse(source);
    sourceObj.scripts = {};
    sourceObj.devDependencies = {};
    sourceObj.jest = {};
    if (sourceObj.main.startsWith('dist/')) {
        sourceObj.main = sourceObj.main.slice(5);
    }
    if (sourceObj.module.startsWith('dist/')) {
        sourceObj.module = sourceObj.main.slice(5);
    }
    if (sourceObj["jsnext:main"].startsWith('dist/')) {
        sourceObj["jsnext:main"] = sourceObj["jsnext:main"].slice(5);
    }

    fs.writeFileSync(__dirname + "/dist/package.json", Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8'));
    fs.writeFileSync(__dirname + "/dist/version.txt", Buffer.from(sourceObj.version, 'utf-8'));
}
main();