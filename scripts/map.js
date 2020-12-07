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

Map.prototype.updateMap = function (districts) {

}

Map.prototype.setClickable = function () {

}

Map.prototype.onClick = function (e) {

}

var TownMap = new Map();