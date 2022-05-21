export default class Player {
  constructor(nameLabel, indicator, scoreLabel) {
    var _nameLabel = nameLabel;
    var _indicator = indicator;
    var _scoreLabel = scoreLabel;
    var _isActive = false;
    var _score = 0;

    this.setName = function (value) {
      _nameLabel.innerText = value;
    };

    this.setScore = function (value) {
      _score = value;
      _scoreLabel.innerText = value.toString();
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
