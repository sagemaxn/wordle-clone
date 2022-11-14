var schedule = require("node-schedule");
const path = require("path");
const fs = require("fs");

let dirPath = path.join(__dirname)

let newAnswer = schedule.scheduleJob('0 0 * * *', () => {

  fs.readFile(
    `${dirPath}/wordList.txt`,
    "utf8",
    function (err, words) {
      words = words.toString().split("\n");
      let index = Math.floor(Math.random() * words.length);
      console.log(index);
      let correctAnswer = words[index].replace(/(\r\n|\n|\r)/gm, "");
    
      fs.writeFile(
        `${dirPath}/currentWord.ts`,
        `const correctAnswer = '${correctAnswer}' \nexport default correctAnswer`,
        function (err) {
          if (err) throw err;
          console.log("complete");
        }
      );
    }
  );
});
export default newAnswer;
