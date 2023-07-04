exports.formatResponse = (data) => {
    const response = {};
    let primaryContactId;
    let emails = [];
    let phoneNumbers = [];
    let secondaryContactIds = [];
    if (Array.isArray(data)) {
        primaryContactId = data[0].id;
        emails.push(data[0].email);
        phoneNumbers.push(data[0].phoneNumber);
        for (let d of data[0].linkedContact) {
            emails.push(d.email);
            phoneNumbers.push(d.phoneNumber);
            secondaryContactIds.push(d.id);
        }
        emails = [... new Set(emails)];
        phoneNumbers = [... new Set(phoneNumbers)];
        secondaryContactIds = [... new Set(secondaryContactIds)];
    }
    else {
        primaryContactId = data.id;
        emails.push(data.email);
        phoneNumbers.push(data.phoneNumber);
    }
    response.contacts = {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryContactIds
    }
    return response
}