/**
 * Creates a new instance of District.
 * @param {City} parentCity The city that the district belongs to
 * @param {string} name Name of the district
 * @param {number} population Population of the district
 * @param {number} area Area of the district
 */
function District(parentCity, name, population, area) {
    this.parentCity = parentCity;
    this.name = name;
    this.population = population;
    this.area = area;
    parentCity.addDistrict(this);
}