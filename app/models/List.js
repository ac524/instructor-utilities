module.exports = function(sequelize, DataTypes) {
    const List = sequelize.define("List", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    List.associate = (models) => {
        List.hasMany(models.ListItem, {
            onDelete: "cascade"
        });

        List.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return List;
}