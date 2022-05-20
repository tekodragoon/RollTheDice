export default class Dice {
  constructor(diceValue = 1) {
    this.diceValue = diceValue;
  }

  setValue(value) {
    this.diceValue = value;
  }

  getValue() {
    return this.diceValue;
  }

  getUrl() {
    return `images/Face${this.diceValue}.png`;
  }
}