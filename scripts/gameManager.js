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
    this.sound = new Audio();
    this.sound.src = "./assets/sound.mp3";
}

/**
 * Finishes the current game session.
 */
GameManager.prototype.endGame = function () {
    finishFunction();
    var svg = document.getElementsByClassName("district");
    for (var i = 0; i < svg.length; ++i) {
        svg[i].classList.add("finished");
    }
    this.finished = true;
    if (this.isWin()) {
        congratulate();
        this.sound.play();
    }

}

/**
 * Finds all districts and updates the webpage accordingly.
 */
GameManager.prototype.findAll = function () {
    var districts = TownDatabase.getAllDistricts();
    for (var i = 0; i < districts.length; ++i) {
        if (!this.foundDistricts.includes(districts[i])) {
            TownMap.updateMap(districts[i].name);
            this.foundDistricts.push(districts[i]);
        }
    }
    this.endGame();
}

/**
 * Resets currently running game session or creates a new one if there is not any.
 */
GameManager.prototype.createGameSession = function () {
    this.foundDistricts = [];
    this.finished = false;
    this.startTime = null;
    this.endTime = null;
}

/**
 * Returns if the game is over. If the game is over stops the timer.
 */
GameManager.prototype.isGameOver = function () {
    if (this.isWin()) {
        if (this.endTime == null)
            this.endTime = new Date();
        return true;
    }
    return false;
}

/**
 * Returns if the current game is a win or not.
 */
GameManager.prototype.isWin = function () {
    return this.foundDistricts.length == TownDatabase.districtCount;
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
    if (districts.length == 0)
        return null;
    if (!TownMap.updateMap(districtName))
        return false;
    this.foundDistricts = this.foundDistricts.concat(districts);
    return districts;
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
    var ms = this.endTime - this.startTime
    var s = Math.floor(ms / 1000);
    var m = 0;
    var h = 0;
    if (s >= 60) {
        m = Math.floor(s / 60);
        s %= 60;
    }
    if (m >= 60) {
        h = Math.floor(s / 60);
        m %= 60;
    }
    var time = ((h != 0) ? h + " hour(s) " : "") + ((m != 0) ? m + " minutes(s) " : "") + ((s != 0) ? s + " second(s)" : "");
    return `You played for ${time}. In this session, you found ${this.foundDistricts.length} districts.`;
}

var Game = new GameManager();