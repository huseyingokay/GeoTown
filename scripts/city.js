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
    for (var district in this.districtList) {
        if(district.name == name)
            return district;
    }
    return null;
}