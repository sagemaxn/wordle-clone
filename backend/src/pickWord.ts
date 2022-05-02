function trimDictionary() {
    fs.readFile("mostCommonWords.txt", "utf8", function (err, words) {
      words = words
        .toString()
        .split("\n")
        .filter(function (word) {
          return word.length === 5 && allowedCharacters.test(word);
        });
    });
  }