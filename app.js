// dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const gif = document.querySelector('.find-gif');
const gifAppKey = "SYLm4Bi57nxl0PqI6AlMRmajZEGcmyVJ";
const gifWrap = document.querySelector('.gifs-wrap');


// add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update the username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  // update name via chatroom
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the form
  newNameForm.reset();
  // show then hide the update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// update the chat room
rooms.addEventListener('click', e => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats & render
chatroom.getChats(data => chatUI.render(data));

const renderImg = (gif) =>{
  const img = document.createElement("IMG");

  img.addEventListener('click', e =>{
    console.log(gif.images.fixed_width.url);
    chatroom.addChat(gif.images.fixed_width.url)
  })
  img.src = gif.images.fixed_width.url;
  gifWrap.appendChild(img);
  
}

gif.addEventListener('submit', e =>{
  e.preventDefault();
  console.log(gif.gifs.value);
  gifWrap.innerHTML = ''

fetch(`https://api.giphy.com/v1/gifs/search?api_key=${gifAppKey}&q=${gif.gifs.value}&limit=10`)
  .then(response => response.json())
  .then(data => {
    console.log(data.data)
    data.data.forEach((element)=>{
      renderImg(element)
      console.log(element)
    })

  });


  
})

