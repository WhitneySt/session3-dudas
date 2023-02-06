const URL_API = "http://localhost:3000/";

export const getConversations = async (idLoggedUser) => {
  try {
    const urlConversationsSender = `${URL_API}conversations?userSender=${idLoggedUser}`;
    const urlConversationsReceptor = `${URL_API}conversations?userReceptor=${idLoggedUser}`;
    const responseSender = await axios.get(urlConversationsSender);
    const responseReceptor = await axios.get(urlConversationsReceptor);
    return [...responseSender.data, ...responseReceptor.data];
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUser = async (idUser) => {
  try {
    const url = `${URL_API}users/${idUser}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const sendText = async (idConversation, arrayMessengers) => {
    try {
        const urlConversation = `${URL_API}conversations/${idConversation}`;
        const response = await axios.patch(urlConversation, {
          menssengers: arrayMessengers
        });
        console.log(response);
        return response
    } catch (error) {
        console.log(error);
        return error
    }
}

export const getContacts = async (idLoggedUser, conversations) => {
//   const contactList = [];
//   conversations.forEach(async(element) => {
//     const idContact =
//       element.userSender == idLoggedUser
//         ? element.userReceptor
//         : element.userSender;
//       const contact = await getUser(idContact);
//       contactList.push(contact);
//     // idContactList.push(idContact);
//   });
//---------------PRUEBEN ESTA!!🌟-------------------------  
    // const contacts = [];
    // for (const element of conversations) {
    // const idContact =
    //   element.userSender == idLoggedUser
    //     ? element.userReceptor
    //     : element.userSender;
    
         // const contact = await getUser(idContact);
    //     contacts.push(contact);    
    // }
//--------------------------------------------------------
 

  const contactList = conversations.map(async (element) => {
    const idContact =
      element.userSender == idLoggedUser
        ? element.userReceptor
        : element.userSender;
    const contact = await getUser(idContact);
    return contact;
  });
    const response = await Promise.all(contactList);
    return response;
  // idContactList.forEach(async (id) => {
  //     const contact = await getUser(id);
  //     contactList.push(contact);
  // })
  // const contactList = idContactList.map(async (id) => {
  //     const contact = await getUser(id);
  //     return contact
  // })
  // return Promise.all(contactList)
};
