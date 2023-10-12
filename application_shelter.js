
var messagesContainer = document.getElementById('messages-container');
document.addEventListener("DOMContentLoaded", function() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

function sendMessage(event){
    var messageType = document.getElementById("message-type").value

    // https://stackoverflow.com/questions/48897314/check-required-fields-with-preventdefault
    if (messageType == "comment" && !document.getElementById('chat-form').checkValidity()){ 
        return;
    }
    
    event.preventDefault();

    // Reference: https://grrr.tech/posts/create-dom-node-from-html-string/
    var chatInput = document.getElementById("chat-input").value;
    var new_message = document.createElement("div");

    if (messageType == "accept"){
        new_message.innerHTML = `
        <div class="system-message accepted-message w-100 justify-content-center align-items-center d-flex flex-column my-3">
            <div class=" text-success d-flex justify-content-center align-items-center text-center" style="width: 90%;">
                <p class="fw-bold align-self-center my-auto mx-1">You accepted the application!</p>
                <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
            </div>
        </div>
        `
        messagesContainer.appendChild(new_message.firstElementChild);
    } else if (messageType == "reject") {
        new_message.innerHTML = `
        <div class="system-message rejected-message w-100 justify-content-center align-items-center d-flex flex-column my-3">
            <div class="text-danger d-flex justify-content-center align-items-center text-center" style="width: 90%;">
                <p class="fw-bold align-self-center my-auto mx-1 ">You rejected the application!.</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
            </div>
        </div>
        `
        messagesContainer.appendChild(new_message.firstElementChild);
    }
    
    if (chatInput != ""){
        new_message.innerHTML = `
        <div class="user-message  message-shelter align-self-end rounded bg-dark-subtle p-3 my-3 d-flex flex-row-reverse align-items-center" style="height: auto; max-width: 80%;">
            <img src="example_images/shelter_portrait.jpg" class="rounded-circle border ms-3 me-1 align-self-start" style="width: 50px; aspect-ratio: 1 / 1;" alt="Pet shelter icon">
            <div class="text-wrap w-100">${chatInput}</div>
        </div>
        `
        messagesContainer.appendChild(new_message.firstElementChild);
        document.getElementById("chat-input").value = "";
    }
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
