

function message_div(msg) {
    let msgDiv = document.createElement('div');
    msgDiv.innerHTML = `From <b>${msg.senderName} (${msg.senderId})</b> to <b>${msg.receiverName} (${msg.receiverId})</b> &emsp; &emsp; ${msg.timestamp} <br> ${msg.text}`;
    msgDiv.classList.add("message");
    return msgDiv;
}

function private_message_div(msg, self_id = 0) {
    let msgDiv = document.createElement('div');
    
    let sender_id = msg.senderId

    msgDiv.innerHTML = `From <b>${msg.senderName} (${msg.senderId})</b> to <b>${msg.receiverName} (${msg.receiverId})</b> &emsp; &emsp; ${msg.timestamp} <br> ${msg.text}`;
    

    if (self_id == sender_id) {
        // msgDiv.style.backgroundColor = "green";
        msgDiv.classList.add("sent_message");
        // console.log(`matched with ${self_id} and sender ${sender_id}`);
    } else {
        // console.log(`did not match with ${self_id} and sender ${sender_id}`);
        // console.log(self_id)
        // console.log(sender_id)
        msgDiv.classList.add("received_message");
    }

    return msgDiv;
}

function display_message_list(msgs, elementId = "message_list") {
    let length = msgs.length;
    let listDiv = document.getElementById(elementId);
    listDiv.innerHTML = "";

    for (let i = 0; i < length; i++) {
        let msg = msgs[i];
        let msgDiv = message_div(msg);
        listDiv.appendChild(msgDiv);
    }
}

async function display_private_message_list(msgs, elementId = "message_list") {
    let id = await get_id()
    // id = id["user_id"]
    let length = msgs.length;
    let listDiv = document.getElementById(elementId);
    listDiv.innerHTML = "";

    for (let i = 0; i < length; i++) {
        let msg = msgs[i];
        let msgDiv = private_message_div(msg, id);
        listDiv.appendChild(msgDiv);
    }
}

async function display_received_message_list(elementId = "message_list") {
    let msgs = await get_received_messages();
    display_message_list(msgs, elementId);
}

async function display_sent_message_list(elementId = "message_list") {
    let msgs = await get_sent_messages();
    display_message_list(msgs, elementId);
}

function user_div(id, username) {
    let userDiv = document.createElement('div');
    userDiv.innerHTML = `<b>${username}</b> (${id}) <a href = "/chat?to=${id}">Chat</a>`;
    userDiv.classList.add('message');
    return userDiv;
}

function display_user_list(users, elementId = "user_list") {
    let length = users.length;
    let listDiv = document.getElementById(elementId);
    listDiv.innerHTML = "";

    for (let i = 0; i < length; i++) {
        let user = users[i];
        let userDiv = user_div(user.id, user.username);
        listDiv.appendChild(userDiv)
    }
}

async function display_main_list() {
    let users = await get_user_list();
    // console.log(users)
    display_user_list(users);
}


