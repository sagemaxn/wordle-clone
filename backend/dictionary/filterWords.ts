const fs = require("fs");
const allowedCharacters = /^[a-z]+$/;
function trimDictionary() {
  fs.readFile("mostCommonWords.txt", "utf8", function (err, words) {
    words = words
      .toString()
      .split("\n")
      .filter(function (word) {
        return word.length === 5 && allowedCharacters.test(word);
      });

    fs.writeFile("wordList.txt", words.join("\r\n"), function (err) {
      if (err) throw err;
      console.log("complete");
    });
  });
}
trimDictionary();