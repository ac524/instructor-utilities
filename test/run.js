const fs    = require ('fs');
const path  = require('path');
const util = require('util');
const mocha = require('mocha');
const suite = new mocha();

const readDir = util.promisify( fs.readdir );

const dirname = "suite";

// Recursively looks for files in folders and builds on list of all found .js files.
const getDirFiles = async folder => {

  const files = [];

  for( filename of  await readDir( folder )) {

    const filePath = path.join(folder, filename);
  
    files.push( ...(filename.match(/\.js$/) ? [ filePath ] : await getDirFiles( filePath )) );

  }

  return files;

}

getDirFiles( path.join(__dirname, dirname) )
  .then(files => {

    // Add each found file to the suite.
    files.forEach(file => suite.addFile( file ));

    // Run the suite.
    suite.run( failures => {
      process.exit(failures);
    });

  });