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
    return ListItem;
}