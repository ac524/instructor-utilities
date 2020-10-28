module.exports = {
    getFeedAggregate: async function() {

        const studentAggregates = [];
        
        for( let i=0; i < this.students.length; i++ )
        
            studentAggregates.push( await this.students[i].getFeedAggregate() );
        
        return {
            ...this.toObject(),
            students: studentAggregates
        }
    
    }
}