
// render chat tamplates to the DOM
// clear the list of chats when we switch room

class ChatUI {
    constructor(list){
      this.list = list;
    }
    clear(){
      this.list.innerHTML = '';
    }
    render(data){
      const when = dateFns.distanceInWordsToNow(
        data.created_at.toDate(),
        { addSuffix:true }
      );

      let html = ""

      if(data.message.includes('https')){
        console.log('da', data.message)
        html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <img src="${data.message}">
          <div class="time">${when}</span>
        </li>`
      }else{
        console.log('nu', data.message)
        html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${data.message}</span>
          <div class="time">${when}</span>
        </li>
      `;
      }

     
      this.list.innerHTML += html;
    }
}