/**
 * Creates a new instance of GameManager. GameManager is
 * the interface between the webpage and the game.
 */
function GameManager() {
    this.createGameSession();    
}

/**
 * Initializes the webpage for the first time.
 */
GameManager.prototype.init = function () {
    TownMap.loadSVGMap();
}

/**
 * Resets currently running game session or creates a new one if there is not any.
 */
GameManager.prototype.createGameSession = function () {
    this.foundDistricts = [];
    this.startTime = null;
    this.endTime = null;
}

/**
 * Returns if the game is over. If the game is over stops the timer.
 */
GameManager.prototype.isGameOver = function () {
    if (this.foundDistricts.length == TownDatabase.districtCount) {
        if (this.endTime == null)
            this.endTime = new Date();
        return true;
    }
    return false;
}

/**
 * Receives a district name input and performs necessary actions inside the game.
 * Returns null if there is no district with the given name and returns false if
 * districts with the given name are already highlighted. Otherwise, returns true.
 * Also if this is the first time this method is being called in the current game
 * session, starts the timer.
 * @param {string} districtName 
 */
GameManager.prototype.giveInput = function (districtName) {
    if (this.startTime == null)
        this.startTime = new Date();
    var districts = TownDatabase.getDistricts(districtName);
    if (districts.length != 0)
        if (TownMap.updateMap(districts))
            return true;
        else
            return false;
    else
        return null;
}

/**
 * Returns an array of districts found in the current game session.
 */
GameManager.prototype.getHighlightedDistricts = function () {
    return Array.from(this.foundDistricts);
}

/**
 * Returns the current game session information.
 */
GameManager.prototype.getSessionInformation = function () {
    return `You played for ${this.endTime - this.startTime}. In this session, you found ${this.foundDistricts.length} districts.`;
}

var Game = new GameManager();