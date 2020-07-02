module.exports = function(sequelize, DataTypes) {
    const List = sequelize.define("List", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return List;
}