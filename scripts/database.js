function Database() {
    this.cityList = [];
    this.districtCount = 0;
}

Database.prototype.readJSONFile = function() {
    var connection = new XMLHttpRequest();
    connection.onreadystatechange = readData;
    connection.open("GET", "./assets/database.json", true);
    connection.send();
    function readData() {
        if (connection.readyState == 4) {
            var data = JSON.parse(this.responseText);
            for (var cityData in data) {
                var city = new City(cityData.name);
                for (var districtData in cityData.districts) {
                    new District(city, districtData.name, districtData.population, districtData.area);
                    ++this.districtCount;
                }
                this.cityList.push(city);
            }
        }
    }
}

Database.prototype.getDistricts = function (name) {
    var found = [];
    for (var city in this.cityList) {
        var district = city.getDistrict(name);
        if (district != null)
            this.found.push(district);
    }
    return found;
}

Database.prototype.getAllDistricts = function () {
    var districts = [];
    for (var city in this.cityList) {
        districts = districts.concat(city.districtList);
    }
    return districts;
}

Database.prototype.getDistrictCount = function () {
    return this.districtCount;
}