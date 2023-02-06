
export const renderContacts = (container, contactList) => {
    container.innerHTML = "";
    contactList.forEach((contact, index) => {
        container.innerHTML += `
        <button class="button__contacts" name=${contact.id} data-index=${index}>${contact.name}</button>
        `
    })
}

export const renderConversations = ({ menssengers }, container, idUserLogged) => {
    container.innerHTML = "";
    menssengers.forEach(messenger => {
        container.innerHTML += `
            <section class=${messenger.sendBy === idUserLogged? 'conversation--me': 'conversation--friend'}>${
          messenger.mensserger
        }</section>
        `;
    })
};