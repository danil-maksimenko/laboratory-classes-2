// 🔄 Refactoro the Changer
// Przenieś teraz odpowiednie wywołania logów z routing.js i zastąp tam logowanie bezpośrednie wywołaniem tych funkcji.

const getInfoLog = (method, url) => {
  return `INFO (${new Date(Date.now()).toUTCString()}): ${method} - ${url}`;
};

const getErrorLog = (url) => {
  return `ERROR (${new Date(
    Date.now()
  ).toUTCString()}): requested url ${url} doesn't exist.`;
};

const getProcessLog = () => {
  return `PROCESS (${new Date(
    Date.now()
  ).toUTCString()}): logout has been initiated and the application will be closed.`;
};

module.exports = {
  getInfoLog,
  getErrorLog,
  getProcessLog,
};
