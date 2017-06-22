/**
 * Created by Aleksandr Necheukhin on 18.06.2017.
 */

var XMLHTTP;
var COUNT_LEFT = 0;
function addNewItem(event, element) {
    //check for the pressed key and empty string
    if(event.keyCode === 13 && element.value !== ""){
        //AJAX technology
        // code for modern browsers (IE 6+)
        XMLHTTP = new XMLHttpRequest();
        //Define the function to be called when the state changes
        XMLHTTP.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { //4: request finished and response is ready, 200 - status OK
                addItemToList(element);
                element.value = ""; //clear element in success
            }
        };
        XMLHTTP.open("GET", "index.html", true);
        XMLHTTP.send();
    }
    else {
        //Not enter or empty
    }

}

function addItemToList(element) {
    //label
    var span = document.createElement("span");
    span.innerHTML = element.value;
    //close button
    var closeButton = document.createElement("button");
    closeButton.className = "close hidden";
    closeButton.innerHTML = "x";
    closeButton.onclick = function() {
        removeItemFromList(closeButton);
    };
    //status button
    var statusButton = document.createElement("button");
    statusButton.className = "status";
    //li element
    var newItem = document.createElement("li");
    newItem.onclick = function () {
        markAsChecked(newItem);
    };
    newItem.onmouseover = function () {
        mouseOver(newItem);
    };
    newItem.onmouseout = function () {
        mouseOut(newItem);
    };
    newItem.appendChild(statusButton);
    newItem.appendChild(span);
    newItem.appendChild(closeButton);
    //put created item to the right position
    document.getElementById("listItem").appendChild(newItem);
    //increase task left
    document.getElementById("countLeft").innerHTML = ++COUNT_LEFT;
}

function showActive() {
    var ul = document.getElementById("listItem");
    for(var item in ul.childNodes) {
        var node = ul.childNodes[item];
        if(node.tagName === "LI") {
            if(node.classList) {
                node.classList.remove("hidden");    //unhide first
                if(node.classList.contains("checked"))
                    node.classList.add("hidden");
            } else {
                //old browser
            }
        }
    }
}

function showAll() {
    var ul = document.getElementById("listItem");
    for(var item in ul.childNodes) {
        var node = ul.childNodes[item];
        if(node.tagName === "LI") {
            if(node.classList) {
                if(node.classList.contains("hidden"))
                    node.classList.remove("hidden");
            } else {
                //old browser
            }
        }
    }
}

function showFinished() {
    var ul = document.getElementById("listItem");
    for(var item in ul.childNodes) {
        var node = ul.childNodes[item];
        if(node.tagName === "LI") {
            if(node.classList) {
                node.classList.remove("hidden");    //unhide first
                if(!node.classList.contains("checked"))
                    node.classList.add("hidden");
            } else {
                //old browser
            }
        }
    }
}

function removeItemFromList(element) {
    event.stopPropagation();            /*stop sending event to parent node*/
    var li = element.parentNode;
    var ul = li.parentNode;
    ul.removeChild(li);


    if (li.classList) {
        if(!li.classList.contains("checked"))
            document.getElementById("countLeft").innerHTML = --COUNT_LEFT;
    } else {
        //old browser
    }

}

function markAsChecked(element) {
    if (element.classList) {    //element is already checked, uncheck it
        if(element.classList.contains("checked")) {
            element.classList.remove("checked");
            setMarker(element, "");
            document.getElementById("countLeft").innerHTML = ++COUNT_LEFT;
        }

        else {
            element.classList.add("checked");
            setMarker(element, "v");
            document.getElementById("countLeft").innerHTML = --COUNT_LEFT;
        }
    } else {
        //old browser
    }
}

function setMarker(element, text) {
    var button = element.firstElementChild;
    button.innerHTML = text;
}

function mouseOver(element) {
    element = element.lastElementChild;
    if (element.classList) {
        if(element.classList.contains("hidden"))
            element.classList.remove("hidden");
    } else {
        //old browser
    }
}

function mouseOut(element) {
    element = element.lastElementChild;
    if(!element.classList.contains("hidden"))
        element.classList.add("hidden");
    else {
        //old browser
    }

}