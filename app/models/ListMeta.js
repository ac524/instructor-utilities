module.exports = function(sequelize, DataTypes) {

    const ListMeta = sequelize.define("ListMeta", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ListMeta.associate = ({ List }) => {
        ListMeta.belongsTo(List, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ListMeta;

}