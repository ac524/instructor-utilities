module.exports = {
    pushItem: function ( by, action, data ) {

        this.items.push({
          by,
          action,
          data
        });
      
        return this;
      
    }
};