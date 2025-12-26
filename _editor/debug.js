const textarea = document.getElementById("debug");

const consoleMessages = [];
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
};

function updateTextarea() {
  textarea.value = consoleMessages.join("\n");
}

["log", "error", "warn", "info"].forEach(method => {
  console[method] = function(...args) {
    const message = args.map(arg => {
      if (typeof arg === "object") {
        try {
          return JSON.stringify(arg);
        } catch {
          return String(arg);
        }
      }
      return String(arg);
    }).join(" ");
      consoleMessages.push(`[${method.toUpperCase()}] ${message}`);

    updateTextarea();
    originalConsole[method].apply(console, args);
  };
});

console.log("<<debug>> Debug configured successfully v0.0.1.")
console.log("<<debug>> Kiwi Game. All rights reserved. ©")
console.log("<<debug>> This Game Engine is still in development, some features may not work or may not work as expected.")
