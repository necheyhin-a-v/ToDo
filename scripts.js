/**
 * Created by Aleksandr Necheukhin on 18.06.2017.
 */


function addNewItem(event, element) {
    //check for the pressed key and empty string
    if(event.keyCode === 13 && element !== ""){
        //AJAX technology
        // code for modern browsers (IE 6+)
        var xmlhttp = new XMLHttpRequest();
        //Define the function to be called when the state changes
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) { //4: request finished and response is ready, 200 - status OK
                addItemToList(element);
            }
        };
        xmlhttp.open("GET", "index.html", true);
        xmlhttp.send();
    }
    else {
        //Not enter or empty
    }

}
function addItemToList(itemName)
{
    var newItem = document.createElement("li");
    newItem.innerHTML = itemName;

    document.getElementById("taskList").appendChild(newItem);
}