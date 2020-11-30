/**
 * Creates a new instance of GameManager. GameManager is
 * the interface between the webpage and the game.
 */
function GameManager() {
    this.createGameSession();    
}

/**
 * Resets currently running game session or creates a new one if there is not any.
 */
GameManager.prototype.createGameSession = function () {
    this.foundDistricts = [];
    this.startTime = null;
    this.endTime = null;
}

/*
GameManager.prototype.isGameOver = function () {

}

GameManager.prototype.giveInput = function (districtName) {

}
*/

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