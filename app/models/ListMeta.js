module.exports = function(sequelize, DataTypes) {

    const ListMeta = sequelize.define(
        "ListMeta",
        {
            ListId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            UserId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            key: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            value: {
                type: DataTypes.JSON,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    );

    ListMeta.associate = ({ List, User }) => {
        ListMeta.belongsTo(List);
        ListMeta.belongsTo(User);
    };
    

    return ListMeta;

}