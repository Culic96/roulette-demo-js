var helpers = {
    enableButton: null,
    disableButton: null,
};

/** Immediately invoked function expression IIFE */
(function(module) {
    function enableButton(btnId) {
        const btn = document.getElementById(btnId);
    
        btn.classList.remove('btn-main-disabled');
        btn.removeAttribute('disabled');
    }
    
    function disableButton(btnId) {
        const btn = document.getElementById(btnId);
        
        btn.classList.add('btn-main-disabled');
        btn.setAttribute('disabled', true);
    }

    // Export functions
    module.enableButton = enableButton;
    module.disableButton = disableButton;
})(helpers);