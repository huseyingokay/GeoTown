/**
 * Creates a new instance of City.
 * @param {string} name Name of the city
 */
function City(name) {
    this.name = name;
    this.districtList = [];
}

/**
 * Adds the district to its district list.
 * @param {District} district The district to be appended to the city.
 */
City.prototype.addDistrict = function (district) {
    this.districtList.push(district);
}

/**
 * Returns the district of a city with the given name.
 * @param {string} name 
 */
City.prototype.getDistrict = function (name) {
    for (var i = 0; i < this.districtList.length; ++i) {
        var district = this.districtList[i];
        if (district.name.localeCompare(name, 'tr', { sensitivity: 'base' }) == 0) {
            return district;
        }
    }
    return null;
}