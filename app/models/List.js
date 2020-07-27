module.exports = function(sequelize, DataTypes) {
    const List = sequelize.define("List", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    List.associate = ({ ListItem, ListMeta, User }) => {

        List.hasMany(ListItem, {
            onDelete: "cascade"
        });

        List.belongsTo(User, {
            foreignKey: {
                allowNull: false
            }
        });

        List.belongsToMany(User, { through: ListMeta });
        List.hasMany(ListMeta, {
            as: "Meta"
        });

    };

    return List;
}