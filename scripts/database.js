/**
 * Creates a new instance of Database.
 */
function Database() {
    this.cityList = [];
    this.districtCount = 0;
    this.readJSONFile();
}

/**
 * Reads the JSON file of database.
 */
Database.prototype.readJSONFile = function () {
    var connection = new XMLHttpRequest();
    connection.onreadystatechange = readData;
    connection.open("GET", "./assets/database.json", true);
    connection.send();
    var outerThis = this;
    function readData() {
        if (connection.readyState == 4) {
            var data = JSON.parse(this.responseText);
            for (var i = 0; i < data.length; ++i) {
                var city = new City(data[i].name);
                for (var j = 0; j < data[i].districts.length; ++j) {
                    new District(city, data[i].districts[j].name, data[i].districts[j].population, data[i].districts[j].area);
                    ++outerThis.districtCount;
                }
                outerThis.cityList.push(city);
            }
        }
    }
}

/**
 * Finds all districts with the given name and returns.
 * @param {string} name 
 */
Database.prototype.getDistricts = function (name) {
    var found = [];
    for (var city in this.cityList) {
        var district = city.getDistrict(name);
        if (district != null)
            this.found.push(district);
    }
    return found;
}

/**
 * Returns all districts available in the database.
 */
Database.prototype.getAllDistricts = function () {
    var districts = [];
    for (var city in this.cityList) {
        districts = districts.concat(city.districtList);
    }
    return districts;
}

/**
 * Returns how many districts there are.
 */
Database.prototype.getDistrictCount = function () {
    return this.districtCount;
}

var TownDatabase = new Database();