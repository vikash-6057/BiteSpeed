const { linkPrecedence } = require("../../../constants/enum_constants");
const { logger } = require("../../../middlewares/logger");
const contactRepository = require("../repository/contact_repository");

exports.identify = async (contact) => {
    try {
        if (!contact.email && !contact.phoneNumber) {
            throw new Error('Email or phoneNumber is required');
        }
        // if request has both email and phone
        if (contact.email && contact.phoneNumber) {
            const res_email = await getContactByEmailOrPhone({ email: contact.email });
            const res_phone = await getContactByEmailOrPhone({ phoneNumber: contact.phoneNumber });
            // both exits in the table
            if (res_email.length > 0 && res_phone.length > 0) {
                return getResponseByEmailAndPhone(res_email[0], res_phone[0], contact);
            }
            // if none of them exits in table
            if (res_email.length === 0 && res_phone.length === 0) {
                return createContact(contact);
            }
            // only one exits in table
            let res = res_email.length > 0 ? res_email[0] : res_phone[0];
            return getResponseByEmailOrPhoneOnly(res, contact);
        }
        // if only one of them is in request
        return getResponseByEmailOrPhone(contact);

    } catch (error) {
        logger.error('Unable to identify contact due to error : ', error);
        throw new Error(error);
    }
}

// both exits in the table
const getResponseByEmailAndPhone = async (emailRes, phoneRes, contact) => {
    const primaryEmail = emailRes.linkPrecedence === linkPrecedence.PRIMARY
    const primaryPhone = phoneRes.linkPrecedence === linkPrecedence.PRIMARY

    // if both primary
    if (primaryEmail && primaryPhone) {
        let pid = emailRes.id;
        // not same the contact 
        // downgrade the latest contact to secondary
        let id = null;
        pid = emailRes.id !== phoneRes.id && emailRes.updatedAt > phoneRes.updatedAt ? phoneRes.id : emailRes.id;
        id = emailRes.id !== phoneRes.id && emailRes.updatedAt > phoneRes.updatedAt ? emailRes.id : phoneRes.id;
        id && await updateContactById(id, {
            linkedId: pid,
            linkPrecedence: linkPrecedence.SECONDARY
        })
        return getContactsById(pid);
    }

    // if none of them is primary
    if (!primaryEmail && !primaryPhone) {
        // if both parent is same
        // return that parent
        let email_pid = emailRes.linkedId;
        let phone_pid = phoneRes.linkedId;
        if (email_pid === phone_pid) {
            return getContactsById(email_pid);
        }
        // else
        //  TODO
    }
    // if one of them is primary only
    if (primaryEmail) {
        return getPrimaryContactByEmailAndPhone(emailRes, phoneRes, contact);
    }
    return getPrimaryContactByEmailAndPhone(phoneRes, emailRes, contact);

}

// only one exits in table
const getResponseByEmailOrPhoneOnly = async (res, contact) => {
    let primaryContact = res.linkPrecedence === linkPrecedence.PRIMARY;
    // if primary 
    // create a new record as secondary where parent will be primary row
    if (primaryContact) {
        await createContact({ ...contact, linkPrecedence: linkPrecedence.SECONDARY, linkedId: res.id });
    }
    // if secondary
    // make it secondary to the existing parent
    else {
        await createContact({ ...contact, linkPrecedence: linkPrecedence.SECONDARY, linkedId: res.linkedId });
    }

    return getContactsById(res.id);
}

// if only one of them is in request
const getResponseByEmailOrPhone = async (contact) => {
    let pid;
    let res;
    if (contact.phoneNumber) {
        res = await getContactByEmailOrPhone({ phoneNumber: contact.phoneNumber });
    }
    if (contact.email) {
        res = await getContactByEmailOrPhone({ email: contact.email });
    }
    // if neither email nor phone is in table it is a new contact
    if (res.length === 0) {
        return createContact(contact)
    }
    // if it is in the table check if it is primary or secondary
    // if secondary get parent id by linkedId
    pid = res[0].linkedId ? res[0].linkedId : res[0].id || 0;
    return getContactsById(pid);
}

const getPrimaryContactByEmailAndPhone = async (primaryRow, secondaryRow, contact) => {
    let pid = primaryRow.id;
    let lid = secondaryRow.linkedId;
    // if secondary row has correct primary parent
    // then just return
    if (pid === lid) {
        return getContactsById(pid);
    }
    // else if secondary has different parent
    // we need to insert one more row as secondary whose parent will be the current contact
    await createContact({ ...contact, linkPrecedence: linkPrecedence.SECONDARY, linkedId: pid });
    return getContactsById(pid);
}

const createContact = (contact) => {
    return contactRepository.createContact(contact);
}

const updateContactById = async (id, contact) => {
    return contactRepository.updateContactById(id, contact);
}

const getContactsById = async (id) => {
    return contactRepository.getContactsById(id);
}

const getContactByEmailOrPhone = async (contact) => {
    return contactRepository.getContactByEmailOrPhone(contact);
}
