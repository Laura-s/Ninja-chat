
// render chat tamplates to the DOM
// clear the list of chats when we switch room
class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear() {
    this.list.innerHTML = '';
  }
  render(data) {
    // console.log(data )
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );

    let html = ""

    if (data.type === 'gif') {
      html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <img src="${data.message}">
          <div class="time">${when}</span>
        </li>`
    } else {
      html = `
        <li class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${this.processLinks(data.message)}</span>
          <div class="time">${when}</span>
        </li>
      `;
    }

    this.list.innerHTML += html;
  }

  processLinks (message) {
    if (message.includes('http')) {
      return message.split(' ')
        .map(word => {
          if (word.includes('http')) {
            return `<a href='${word}' target='_blank'>${word}</a>`
          }
          return word
        })
        .join(' ')
    }
    return message
  }
}
