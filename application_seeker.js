var messagesContainer = document.getElementById('messages-container');
document.addEventListener("DOMContentLoaded", function() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

function sendMessage(event){
    if (!document.getElementById('chat-form').checkValidity()){ 
        return;
    }
    event.preventDefault();

    // Reference: https://grrr.tech/posts/create-dom-node-from-html-string/
    var new_message = document.createElement("div");
    var chatInput = document.getElementById("chat-input").value;
    new_message.innerHTML = `
        <div class="user-message align-self-end message-seeker rounded bg-body-tertiary p-3 my-4 d-flex align-items-center  flex-row-reverse" style="height: auto; max-width: 80%;">
            <img src="images/user.png" class="rounded-circle border ms-3 me-3 align-self-start" style="width: 50px;">
            <div class="text-wrap w-100">${chatInput}</div>
        </div>
    `
    messagesContainer.appendChild(new_message.firstElementChild);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    document.getElementById("chat-input").value = "";
}

