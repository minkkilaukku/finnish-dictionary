
var readDictionary = function(filePath, callBack) {
    var dict = [];
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", filePath, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var wordList = rawFile.responseText.split("\n");
                console.log(wordList.length+" words read");
                for (i in wordList) {
                    let w = wordList[i].trim().toUpperCase();
                    dict.push(w);
                }
                if (typeof callBack === "function") {
                    callBack(dict);
                }
            }
        }
    }
    rawFile.send(null);
};



var loadDict = function(callBack) {
    readDictionary("dicts/finnish_words.txt", callBack);
};


/*
readDictionary("dicts/finnish_words.txt", function(d) {
    for (let w of d) {
        DICT.push(w);
    }
});
*/