const { DataTypes } = require("sequelize");
const { linkPrecedence } = require('../../../constants/enum_constants');
const { sequelize } = require("../../../config/database");
const Contact = sequelize.define(
    'Contact',
    {
        id: {
            type: DataTypes.INTEGER,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        },
        linkedId: {
            type: DataTypes.STRING
        },
        linkPrecedence: {
            type: DataTypes.ENUM,
            values: [linkPrecedence.PRIMARY, linkPrecedence.SECONDARY],
            defaultValue: linkPrecedence.PRIMARY

        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }
)
Contact.associate = () => {
    Contact.hasMany(Contact, {
        foreignKey: 'linkedId',
        as: 'linkedContact'
    });
    Contact.belongsTo(Contact, {
        foreignKey: 'linkedId',
        as: 'parentContact'
    });
}

exports.Contact = Contact;