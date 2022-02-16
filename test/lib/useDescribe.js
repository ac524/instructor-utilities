const useDescribe = context => ( description, content ) => {
    return process.argv[2] === description
    
        ? describe.only(description, content.bind(context))
        
        : describe(description, content.bind(context));
};

module.exports = useDescribe;