var MessageType = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
};

var Messages = {
    init: null,
    setMessage: null,
    clearMessage: null
};

/**
 * init(msgId)
 * 
 * setMessage(message, messageType)
 *  - messageType formats the message to be of color for success / error
 * 
 */
(function(global){
    const mainMsg = document.getElementById("main-msg");

    function msgInfo(message) {
        return `<span class="info"><b>${message}</b></span>`;
    }

    function msgSucces(message){
        return `<span class="success"">${message.toUpperCase()}</span>`;
    }

    function msgEror(message){
        return `<span class="error"">${message.toUpperCase()}</span>`;
    }

    function setMessage(message, messageType){
        if(messageType === MessageType.INFO) {
            mainMsg.innerHTML = msgInfo(message);
        }else if(messageType === MessageType.SUCCESS){
            mainMsg.innerHTML = msgSucces(message);
        }else if(messageType === MessageType.ERROR){
            mainMsg.innerHTML = msgEror(message);
        }
    }

    global.setMessage = setMessage;
})(Messages);