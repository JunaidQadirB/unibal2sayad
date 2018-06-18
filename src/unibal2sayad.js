/**
 * UniBal2Sayad is a experimental script converter for Baloch
 * which converts text from UniBal script to Sayad Script
 * @author Junaid Qadir Baloch <shekhanzai.baloch@gmail.com>
 * @licence MIT
 * @type {{convert}}
 */
var UniBal2Sayad = (function () {

    /**
     *********** STEPS
     * Change to lower case
     * Split in to words
     * Process Each word
     *  - convert diphthongs (او،ئے،ئو،ئی)
     *  - covert double letters to Dakk (emphasis or shaddah)
     *
     * Join words back
     */




    let mapping = [
        {'a': 'َ'},
        {'á': 'ا'},
        {'b': 'ب'},
        {'c': 'چ'},
        {'d': 'د'},
        {'đ': 'ڈ'},
        {'ḓ': 'ذ'},
        {'e': 'ے'},
        {'é': 'ے'},
        {'f': 'پ'},
        {'g': 'گ'},
        {'ǵ': 'گ'},
        {'h': 'ہ'},
        {'i': 'ِ'},
        {'í': 'ی'},
        {'j': 'ج'},
        {'k': 'ک'},
        {'l': 'ل'},
        {'m': 'م'},
        {'n': 'ن'},
        {'ń': 'ں'},
        {'o': 'و'},
        {'ó': 'و'},
        {'p': 'پ'},
        {'r': 'ر'},
        {'ŕ': 'ڑ'},
        {'s': 'س'},
        {'ś': 'ش'},
        {'t': 'ت'},
        {'ŧ': 'ٹ'},
        {'ṱ': 'ث'},
        {'u': 'ُ'},
        {'ú': 'و'},
        {'w': 'و'},
        {'y': 'ے'},
        {'z': 'ز'},
        {'ź': 'ژ'},
        {'?': '؟'},
        {',': '،'},
    ];

    function toWords(text) {
        text = text.replace(/(\n)+/g, " --- ");
        return text.split(" ");
    }

    function toDakk(word) {
        let output = "";
        for (let i = 0, len = word.length; i < len; i++) {
            if (i + 1 < len && word[i] === word[i + 1] && !Number.isInteger(parseInt(word[i]))) {
                word = word.replaceAt(i + 1, 'ّ');
            }
        }
        return word;
    }

    function replace(letter) {
        for (let item in mapping) {
            if (mapping[item].hasOwnProperty(letter)) {
                return mapping[item][letter];
                break;
            }
        }
        return letter;
    }

    function yaIfGranzenk(word) {
        for (let i = 0, len = word.length; i < len; i++) {
            if (i + 1 < len) {
                if (word[i + 1] === 'ń' && (word[i] === 'i' || word[i] === 'e' || word[i ] === 'é' || word[i] === 'í')) {
                    if(i-1>=0) {
                        word = word.replaceAt(i, 'یں');
                    }else{
                        word = word.replaceAt(i, 'ایں');
                    }
                }
            }
        }
        return word;
    }

    function diphthongs(word) {
        if (word.indexOf('ae') >= 0) {
            return word.replace('ae', 'ئے');
        }
        if (word.indexOf('ao') >= 0) {
            return word.replace('ao', 'ئو');
        }
        if (word.indexOf('aí') >= 0) {
            return word.replace('aí', 'ئی');
        }
        if (word.indexOf('ua') >= 0) {
            return word.replace('ua', 'وَ');
        }

        return word;
    }

    function ifYaThenAlif(word) {
        for (let i = 0, len = word.length; i < len; i++) {
            if (i + 1 < len) {
                if (word[i] === 'í' && (word[i + 1] === 'a' || word[i + 1] === 'á')) {
                    word = word.replaceAt(i + 1, 'ا');
                }
            }
        }
        return word;
    }

    function processWord(word) {
        word = word.toLowerCase();
        word = diphthongs(word);
        word = toDakk(word);
        word = ifYaThenAlif(word);
        word = yaIfGranzenk(word);

        if (word.length === 1 && word === 'e') {
            word = 'ءِ';
            return word;
        }

        if (word === 'á') {
            word = 'ءَ';
            return word;
        }

        if (word.length === 1 && word === 'u') {
            word = 'ءُ';
            return word;
        }

        if (word.length === 1 && word === 'é') {
            word = 'اے';
            return word;
        }

        if (word[word.length - 1] === 'a') {
            word = word.replaceAt(word.length - 1, 'ا');
        }

        if (word.indexOf('y') !== 0 || word.indexOf('y') !== word.length - 1) {
            word = word.replace('y', 'ی');
        }

        if (word.indexOf('í') === 0) {
            word = word.replace('í', 'ای');
        }

        if (word.indexOf('e') === 0) {
            word = word.replace('e', 'ای');
        }

        if (word.indexOf('i') === 0) {
            word = word.replace('i', 'اِ');
        }

        if (word.indexOf('i') === word.length - 1) {
            word = word.replace('i', 'ے');
        }

        if (word.indexOf('ó') === 0) {
            word = word.replace('ó', 'او');
        }

        if (word.indexOf('ú') === 0) {
            word = word.replace('ú', 'او');
        }

        if (word.indexOf('ń') !== 0 && word.indexOf('ń') !== word.length - 1) {
            word = word.replace('ń', 'ن');
        }

        if (word.indexOf('e') !== 0 && word.indexOf('e') !== word.length - 1) {
            word = word.replace('e', 'ی');
        }

        if (word.indexOf('é') === word.length - 1) {
            word = word.replace('é', 'ے');
        }

        if (word.indexOf('é') !== 0 || word.indexOf('é') !== word.length - 1) {
            word = word.replace('é', 'ی');
        }

        if (word.indexOf('á') === 0) {
            word = word.replace('á', 'آ');
        }

        if (word.indexOf('a') === 0) {
            word = word.replace('a', 'اَ');
        }

        if (word.indexOf('u') === 0) {
            word = word.replace('u', 'ا');
        }

        if (word.indexOf('i') === 0) {
            word = word.replace('i', 'اِ');
        }

        let output = "";
        for (let i = 0, len = word.length; i < len; i++) {
            let val = word[i];

            output += replace(val);

        }
        word = output;
        return wrapUp(word);
    }

    function wrapUp(word) {
        let output = "";
        for (let i = 0, len = word.length; i < len; i++) {
            let val = word[i];
            if (val === " ") {
                output += " ";
            } else if (val === "\n") {
                output += "\n";
            } else {
                output += replace(val);
            }
        }
        return output;
    }

    function convert(unibalText) {
        let words = toWords(unibalText.toLowerCase());
        let output = '';
        for (let i = 0, len = words.length; i < len; i++) {
            if (words[i] === "---") {
                output += "\n";
            } else {
                output += processWord(words[i]) + " ";
            }
        }
        return output;
    }

    return {
        convert
    }
})();