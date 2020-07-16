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

        List.hasMany(ListMeta, {
            onDelete: "cascade"
        });

        List.belongsTo(User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return List;
}