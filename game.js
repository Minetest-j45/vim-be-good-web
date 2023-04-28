var textarea = document.getElementById('vim');
var input = document.getElementById('input');

var solid = document.createElement("p");
solid.innerHTML = '&#9608';
var s = solid.innerHTML;

var rows = textarea.rows;
var cols = textarea.cols;
var length = rows*cols; 

var currentX;
var cursorPos = 0;

textarea.value = createRandomMap();

function addAt(str, char, index) {
    return [str.slice(0, index)+ char, str.slice(index+1)].join("");
}

function createRandomMap() {
    var map = "";
    for (let i = 0; i < length; i++) {
        if (i%cols == 0 && i != 0) {
            map += "\n "
        }
        map += " "
    }
    var xPos = Math.floor(Math.random() * length);
    currentX = xPos;
    return addAt(addAt(map, "X", xPos), s, 0);
}

function createMap() {
    var map = ""
    for (let i = 0; i < length; i++) {
        if (i%cols == 0 && i != 0) {
            map += "\n "
        }
        map += " "
    }
    map = addAt(addAt(map, "X", currentX), s, cursorPos);
    return map;
}

input.onkeypress = function(e) {
    console.log(cols);
    if (e.key == "h") {
        if (cursorPos%(cols+2) != cols) {
            cursorPos -= 1;
        } 
    } else if (e.key == "l") {
        if (cursorPos%(cols+2) != 49) {
            cursorPos += 1;
        }
    } else if (e.key == "j") {
            cursorPos += cols+2;

    } else if (e.key == "k") {
            cursorPos -= cols+2; 
    }
    if (cursorPos == currentX) {
        console.log("you won");
        textarea.value = createRandomMap();
    }
    console.log(cursorPos%(cols+2))
    console.log("X:" + currentX);
    textarea.value = createMap();
}
