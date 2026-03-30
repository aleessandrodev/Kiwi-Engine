const textarea = document.getElementById("debug");
const consoleMessages = [];

function updateTextarea() {
    if (textarea) {
        textarea.value = consoleMessages.join("\n");
        textarea.scrollTop = textarea.scrollHeight;
    }
}

window.addEventListener("message", (event) => {
    
    if (event.data && event.data.type === "console") {
        const { method, message } = event.data;

        const msg = Array.isArray(message) 
            ? message.map(arg => {
                try {
                    return typeof arg === "object" ? JSON.stringify(arg) : String(arg);
                } catch {
                    return "[Oggetto non serializzabile]";
                }
            }).join(" ")
            : String(message);

        const timestamp = new Date().toLocaleTimeString([], { hour12: false });
        consoleMessages.push(`[${timestamp}] [GAME ${method.toUpperCase()}] ${msg}`);

        if (consoleMessages.length > 100) consoleMessages.shift();
        
        updateTextarea();
    }
});