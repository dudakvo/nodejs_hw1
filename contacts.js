const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contact.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsArray = JSON.parse(data.toString());

    return contactsArray;
  } catch (error) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  console.table(contacts.find((contact) => contact.id === contactId));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  );
}

async function addContact(name = "name", email = "email", phone = "phone") {
  const contactsArray = await listContacts();
  const id =
    contactsArray.reduce((maxID, { id } = contact) => Math.max(maxID, id), 0) +
    1;

  contactsArray.push({
    id: id,
    name: name,
    email: email,
    phone: phone,
  });

  fs.writeFile(contactsPath, JSON.stringify(contactsArray));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
