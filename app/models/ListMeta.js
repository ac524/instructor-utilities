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
            timestamps: false,
            indexes: [
                {
                    name: 'UserListMeta',
                    unique: true,
                    fields: ['UserId', 'ListId', 'key']
                }
            ]
        }
    );

    ListMeta.associate = ({ List, User }) => {
        ListMeta.belongsTo(List);
        ListMeta.belongsTo(User);
    };
    

    return ListMeta;

}