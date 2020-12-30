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
 * Finds the district in the given city with the given name and returns.
 * @param {string} cityName 
 * @param {string} districtName
 */
Database.prototype.getDistrict = function (cityName, districtName) {
    for (var i = 0; i < this.cityList.length; ++i) {
        if (this.cityList[i].name == cityName)
            return this.cityList[i].getDistrict(districtName);
    }
    return null;
}

/**
 * Finds all districts with the given name and returns.
 * @param {string} name 
 */
Database.prototype.getDistricts = function (name) {
    var found = [];
    for (var i = 0; i < this.cityList.length; ++i) {
        var district = this.cityList[i].getDistrict(name);
        if (district != null)
            found.push(district);
    }
    return found;
}

/**
 * Returns all districts available in the database.
 */
Database.prototype.getAllDistricts = function () {
    var districts = [];
    for (var i = 0; i < this.cityList.length; ++i) {
        districts = districts.concat(this.cityList[i].districtList);
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