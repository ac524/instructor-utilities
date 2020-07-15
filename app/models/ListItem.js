module.exports = function(sequelize, DataTypes) {
    
    const ListItem = sequelize.define("ListItem", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
<<<<<<< HEAD
        },
        isSelected: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
=======
>>>>>>> mysql-api-integration
        }
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