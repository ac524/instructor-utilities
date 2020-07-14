module.exports = function(sequelize, DataTypes) {
    const ListItem = sequelize.define("ListItem", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        selected: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
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