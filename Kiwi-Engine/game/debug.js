
(function() {
    const methods = ["log", "error", "warn", "info"];
    
    methods.forEach(method => {
        const original = console[method];

        console[method] = function(...args) {
            const targetWindow = window.opener || window.parent;

            if (targetWindow && targetWindow !== window) {
                targetWindow.postMessage({
                    type: "console",
                    method: method,
                    message: args
                }, "*"); 
            }

            original.apply(console, args);
        };
    });

    window.onerror = function(message, source, lineno, colno, error) {
        console.error(`${message} @ ${source}:${lineno}:${colno}`);
    };

    console.log("<<debug>> Programma avviato correttamente!");
})();