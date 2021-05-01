const contat = require("./contacts.js");
const { program } = require("commander");

program
  .requiredOption(
    "-a, --action <type>",
    "select action: get contact bi ID (g),  add contact (a), remove contact by ID (r), list contats (l)"
  )
  .option("-i, --id <type>", "contact id")
  .option("-n --name <type>", "contact name")
  .option("-p --phone <type>", "contact phone")
  .option("-e --email <type>", "contact email");

program.parse(process.argv);

const option = program.opts();

invokeAction(option);

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "l":
      console.table(await contat.listContacts());
      break;

    case "g":
      console.log("select action get by ID");
      contat.getContactById(Number(id));
      break;

    case "a":
      contat.addContact(name, email, phone);
      break;

    case "r":
      contat.removeContact(Number(id));
      break;

    default:
    //console.warn("\x1B[31m Unknown action type!");
  }
}
