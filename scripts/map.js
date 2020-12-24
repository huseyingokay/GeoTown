/**
 * Creates an instance of Map.
 */
function Map() {
    this.svgImage = null;
    this.isClickable = false;
}

/**
 * Loads the SVG file and appends to the DOM.
 */
Map.prototype.loadSVGMap = function () {
    var connection = new XMLHttpRequest();
    connection.onreadystatechange = readData;
    connection.open("GET", "./assets/map.svg", true);
    connection.send();
    var outerThis = this;
    function readData() {
        if (connection.readyState == 4) {
            document.getElementById("map").innerHTML = this.responseText;

            var beforePan = function (oldPan, newPan) {
                var stopHorizontal = false,
                    stopVertical = false,
                    sizes = this.getSizes(),
                    gutterWidth = sizes.width * 0.8,
                    gutterHeight = sizes.height * 0.4,

                    leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth,
                    rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom),
                    topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight,
                    bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

                customPan = {};
                customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x));
                customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y));

                return customPan;
            }

            outerThis.panZoom = svgPanZoom('#map-svg', {
                zoomScaleSensitivity: 0.3,
                minZoom: 1,
                maxZoom: 8,
                dblClickZoomEnabled: false,
                beforePan: beforePan
            });
        }
    }
}

/**
 * Highlights districts with the given name. Returns true if districts are already highlighted;
 * otherwise, returns false.
 * @param {string} districtName 
 */
Map.prototype.updateMap = function (districtName) {
    var districts = document.getElementsByClassName("district");
    var count = 0;
    for (var i = 0; i < districts.length; ++i) {
        if (!districts[i].classList.contains("highlighted") && districts[i].id.localeCompare(districtName, 'tr', { sensitivity: 'base' }) == 0) {
            districts[i].classList.add("highlighted");
            ++count;
        }
    }
    return count != 0;
}

/**
 * MouseEventListener function for SVG Map. If clicked on a district, alerts user about the
 * district if the game is over.
 */
Map.prototype.onClick = function () {
    if (event.type == "mousedown")
        this.isDragged = {x: event.clientX, y: event.clientY};
    if (event.type == "mouseup")
        this.isDragged = this.isDragged.x == event.clientX && this.isDragged.y == event.clientY;
    if (Game.finished && event.type == "click" && this.isDragged) {
        var district = TownDatabase.getDistrict(event.target.parentElement.parentElement.id, event.target.parentElement.id);
        alert(`${district.parentCity.name} ${district.name} ${district.population} ${district.area}`);
    }
}
Map.prototype.onClick.isDragged = null;

var TownMap = new Map();