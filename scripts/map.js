function Map() {
    this.svgImage = null;
    this.isClickable = false;
}

Map.prototype.loadSVGMap = function() {
    var connection = new XMLHttpRequest();
    connection.onreadystatechange = readData;
    connection.open("GET", "./assets/map.svg", true);
    connection.send();
    function readData() {
        if (connection.readyState == 4) {
            document.getElementById("map").innerHTML = this.responseText;
        }
    }
}

Map.prototype.reset = function() {
    
}

Map.prototype.zoom = function (amount) {

}

Map.prototype.updateMap = function (districtName) {
    var districts = document.getElementsByClassName("district");
    var count = 0;
    for (var i = 0; i < districts.length; ++i) {
        if (districts[i].id == districtName) {
            districts[i].classList.add("highlighted");
            ++count;
        }
    }
    return count != 0;
}

Map.prototype.setClickable = function () {

}

Map.prototype.onClick = function (e) {

}

var TownMap = new Map();