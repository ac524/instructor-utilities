const fs    = require ('fs');
const path  = require('path');
const util = require('util');
const mocha = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const readDir = util.promisify( fs.readdir );

// Starting diretor to scan.
const dirname = "suite";

// Recursively looks for files in folders and builds on list of all found .js files.
const getDirFiles = async folder => {

  const files = [];

  for( filename of  await readDir( folder )) {

    const filePath = path.join(folder, filename);

    const match = filename.match(/\.js$/);

    if( !match ) {
      // Ignore folders prefixed with "_"
      if( filename[0] !== "_" )

        files.push( ...(await getDirFiles( filePath )) );

      continue;
    }
  
    // Push files named `test.js` or that end with `.test.js`.
    if( "test.js" === filename || ".test.js" === filename.substr(-8) ) files.push( filePath );

  }

  return files;

}

getDirFiles( path.join(__dirname, dirname) )
  .then(files => {

    const suite = new mocha();

    // Add each found file to the suite.
    files.forEach(file => suite.addFile( file ));

    // Run the suite.
    suite.run( failures => {
      process.exit(failures);
    });

  });