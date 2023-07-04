const { linkPrecedence } = require("../../../constants/enum_constants");
const { Contact } = require("../model/contact_model");
exports.createContact = async (contact) => {
    try {
        const new_contact = await Contact.create(contact);
        return new_contact;
    } catch (error) {
        throw new Error(`Unable to create user due to : ${error}`);
    }

}

exports.updateContactById = async (id, contact) => {
    return Contact.update(
        contact, {
        where: { id: id }
    })
}

exports.getContactsById = async (id) => {
    return Contact.findAll({
        where: { id: id },
        include: [{
            model: Contact,
            as: 'linkedContact',
            where: { linkedId: id },
            order: [['updatedAt', 'ASC']],
            required: false
        }]
    })
}

exports.getContactByEmailOrPhone = async (contact) => {
    return Contact.findAll(
        {
            where: contact,
            order: [['updatedAt', 'ASC']],
            limit: 1,
        }
    )
}
