const fs = require("fs");

const getMessagesHistory = (path) => {
  if (!fs.existsSync(path)) return;

  const textContent = fs.readFileSync(path, "utf-8", (err) => {
    if (err) console.log(err);
  });

  const arr = textContent.split(";");
  arr.pop();

  const obj = arr.map((el) => {
    return {
      message: el.split("|id|").shift(),
      userId: el.split("|id|").pop(),
    };
  });

  return obj;
};

module.exports = getMessagesHistory;
