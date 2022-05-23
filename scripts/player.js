export default class Player {
  constructor(nameLabel, indicator, scoreLabel, index, ia) {
    var _index = index;
    var _nameLabel = nameLabel;
    var _indicator = indicator;
    var _scoreLabel = scoreLabel;
    var _isActive = false;
    var _score = 0;
    var _ia = ia;

    this.getIndex = function() {
      return _index;
    };

    this.isIa = function() {
      return _ia;
    };

    this.setIA = function (isIA) {
      _ia = isIA;
    };

    this.setName = function (value) {
      _nameLabel.innerText = value;
    };

    this.getName = function() {
      return _nameLabel.innerText;
    };

    this.addScore = function (value) {
      _score += value;
      _scoreLabel.innerText = _score.toString();
    };

    this.resetScore = function() {
      _score = 0;
      _scoreLabel.innerText = _score.toString();
      this.setActive(false);
    };

    this.getScore = function () {
      return _score;
    };

    this.setActive = function (value) {
      _isActive = value;
      if (_isActive) {
        _showIndicator();
        return;
      } 
      _hideIndicator();
    };

    var _showIndicator = function () {
      _indicator.style.setProperty("--indicatorColor", "red");
    };

    var _hideIndicator = function () {
      _indicator.style.setProperty("--indicatorColor", "transparent");
    };
  }
}
