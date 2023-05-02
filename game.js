var textarea = document.getElementById('vim');
var input = document.getElementById('input');

var solid = document.createElement("p");
solid.innerHTML = '&#9608';
var s = solid.innerHTML;

var rows = textarea.rows;
var cols = textarea.cols;
var length = rows*cols; 
var reallen = rows*cols;

var currentX;
var cursorPos = 0;
var changed;

var repetitions = 0;
var repeat = false;

textarea.value = createRandomMap();

function addAt(str, char, index) {
    return [str.slice(0, index)+ char, str.slice(index+1)].join("");
}

function createRandomMap() {
    var map = "";
    for (let i = 0; i < length; i++) {
        if (i%cols == 0 && i != 0) {
            map += "\n ";
            reallen += 2;
        }
        map += " ";
    }
    var xPos = Math.floor(Math.random() * length);
    currentX = xPos;

    return addAt(addAt(map, "X", xPos), s, 0);
}

function createMap() {
    var map = "";
    for (let i = 0; i < length; i++) {
        if (i%cols == 0 && i != 0) {
            map += "\n ";
        }
        map += " ";
    }

    return addAt(addAt(map, "X", currentX), s, cursorPos);
}

function handleMove(key) {
        changed = false;
        if (key == "h") {
            if (cursorPos%(cols+2) != cols && cursorPos != 0) {
                cursorPos -= 1;
                changed = true;
            }
        } else if (key == "l") {
            if (cursorPos%(cols+2) != cols-2 && cursorPos != reallen-2) {
                cursorPos += 1;
                changed = true;
            }
        } else if (key == "j") {
            if (reallen-cursorPos > cols+2) {
                if (cursorPos < cols) {
                    cursorPos += cols+1;
                } else {
                    cursorPos += cols+2;
                }
                changed = true;
            }

        } else if (key == "k") {
            if (cursorPos > cols) {
                if ((2*cols)+2 > cursorPos) {
                    cursorPos -= cols+1;
                } else {
                    cursorPos -= cols+2;
                }
                changed = true;
            }
        }

        if (changed) {
            if (cursorPos == currentX) {
                console.log("you won");
                textarea.value = createRandomMap();
            }
            console.log("pos " + cursorPos + " X " + currentX, " len " + reallen);
        }
}

input.onkeypress = function(e) {
    handleMove(e.key)
    if (repeat) {
        for (let i = 0; i <= repetitions; i++) {
            handleMove(e.key)
        }
    }

    if (!isNaN(parseInt(e.key))) {
        repeat = true;
        repetitions = (repetitions*10) + parseInt(e.key);
        console.log(repetitions)
    } else {
        repeat = false;
        repetitions = 0;
    }

    textarea.value = createMap();
}
