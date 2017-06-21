/**
 * Created by Aleksandr Necheukhin on 18.06.2017.
 */

var xmlhttp;

function addNewItem(event, element) {
    //check for the pressed key and empty string
    if(event.keyCode === 13 && element.value !== ""){
        //AJAX technology
        // code for modern browsers (IE 6+)
        xmlhttp = new XMLHttpRequest();
        //Define the function to be called when the state changes
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { //4: request finished and response is ready, 200 - status OK
                addItemToList(element);
                element.value = ""; //clear element in success
            }
        };
        xmlhttp.open("GET", "index.html", true);
        xmlhttp.send();
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
}

function removeItemFromList(element) {
    event.stopPropagation();            /*stop sending event to parent node*/
    var li = element.parentNode;
    var ul = li.parentNode;
    ul.removeChild(li);
}

function markAsChecked(element) {
    if (element.classList) {
        if(element.classList.contains("checked")) {
            element.classList.remove("checked");
            setMarker(element, "");
        }

        else {
            element.classList.add("checked");
            setMarker(element, "v");
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