import { getContacts, getConversations, sendText } from "./modules/services.js";
import { renderContacts, renderConversations } from "./modules/ui.js";

//Vamos a suponer que el usuario que se logueó fue el usuario con id = 3

const loggedUser = 3;
let conversations = [];

const container = document.getElementById("contacts");
const containerConversations = document.getElementById("conversations");
const form = document.getElementById("form");

// const userSender = 3;
// const userReceptor = 2;

//1. Traernos las conversaciones del usuario logeado
document.addEventListener('DOMContentLoaded', async () => {
    conversations = await getConversations(loggedUser);
    console.log(conversations);
    const contacts = await getContacts(loggedUser, conversations);
    console.log(contacts);
    renderContacts(container, contacts);
});

//2. Mostrar una conversación
document.addEventListener('click', ({target}) => {
    if (target.classList.contains('button__contacts')) {
        const index = parseInt(target.getAttribute("data-index"));
        const conversation = conversations[index];
        renderConversations(conversation, containerConversations, loggedUser);
        sessionStorage.setItem('indexConversation', JSON.stringify(index));
    }
})

//3. Enviar un mensaje a nuestro contacto
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const textBox = document.getElementById("messenger");
    const indexConversation = JSON.parse(
      sessionStorage.getItem("indexConversation")
    );
    const { id, menssengers } = conversations[indexConversation];
    console.log(textBox.value);
    if (textBox.value) {
        const msg = {
          id: menssengers.length + 1,
          sendBy: loggedUser,
          mensserger: textBox.value,
          isSeem: false
        };
        menssengers.push(msg);
        await sendText(id, menssengers);
        renderConversations(
          conversations[indexConversation],
          containerConversations,
          loggedUser
        );
        textBox.value = "";
    }
})


