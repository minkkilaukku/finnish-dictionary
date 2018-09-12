var loadDict;

(function() {
const DICT_IN_LANKKI_MIUKKU = [];

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



var dictInLankkiMiukkuReady = false;
var callBacksForDict = [];

readDictionary("dicts/finnish_words.txt", function(d) {
    for (let w of d) {
        DICT_IN_LANKKI_MIUKKU.push(w);
    }
    dictInLankkiMiukkuReady = true;
    for (let cB of callBacksForDict) {
        cB(DICT_IN_LANKKI_MIUKKU);
    }
});



loadDict = function(callBack) {
    //readDictionary("dicts/finnish_words.txt", callBack);
    if (typeof callBack === "function") {
        if (dictInLankkiMiukkuReady) {
            callBack(DICT_IN_LANKKI_MIUKKU);
        } else {
            callBacksForDict.push(callBack);
        }
    }
};
    
})();