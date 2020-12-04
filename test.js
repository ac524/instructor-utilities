class Test {

    constructor() {

        this.something = "this";

    }


    talk() {
        console.log( this.something );
    }

};

class TestTwo extends Test {

    talk() {
        super.talk();
    }

}


const runMe = ( cb ) => {

    cb();

}

const test = new TestTwo();

runMe( test.talk.bind(test) );