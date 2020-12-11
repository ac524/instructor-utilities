const fs    = require ('fs');
const path  = require('path');
const util = require('util');
const mocha = require('mocha');
const suite = new mocha();

const readDir = util.promisify( fs.readdir );

const dirname = "suite";

const ignoreMap = new Map([ ["suite",1] ]);

// Recursively looks for files in folders and builds on list of all found .js files.
const getDirFiles = async folder => {

  const files = [];

  for( filename of  await readDir( folder )) {

    const filePath = path.join(folder, filename);

    const match = filename.match(/\.js$/);

    if( !match ) {
      if( !ignoreMap.has( filename ) ) files.push( ...(await getDirFiles( filePath )) );
      continue;
    }
  
    // Push files named `test.js` or that end with `.test.js`.
    if( "test.js" === filename || ".test.js" === filename.substr(-8) ) files.push( filePath );

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