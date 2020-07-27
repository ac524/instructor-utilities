module.exports = function(sequelize, DataTypes) {

    const ListMeta = sequelize.define(
        "ListMeta",
        {
            key: {
                type: DataTypes.STRING,
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

    ListMeta.associate = ({ List }) => {
        ListMeta.belongsTo(List);
    };
    

    return ListMeta;

}