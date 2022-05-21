export default class Dice {
  constructor(diceValue = 1) {
    var _diceValue = diceValue;
    this.setValue = function (value) {
      if (value >= 1 && value <= 6) {
        _diceValue = value;
      }
    };
    this.getValue = function () {
      return _diceValue;
    };
    this.getUrl = function () {
      return `images/Face${_diceValue}.png`;
    };
    this.roll = function() {
      _diceValue = Math.floor(Math.random() * 6) + 1;
    };
  }
}
