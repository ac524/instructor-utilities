module.exports = function(sequelize, DataTypes) {
    
    const ListItem = sequelize.define("ListItem", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamps: false
    });

    ListItem.associate = (models) => {
        ListItem.belongsTo(models.List, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ListItem;
    
}