export default class Player {
  constructor(nameLabel, indicator, scoreLabel) {
    this.nameLabel = nameLabel;
    this.name = nameLabel.innerText;
    this.indicator = indicator;
    this.scoreLabel = scoreLabel;
    this.score = 0;
  }

  setName(value) {
    this.nameLabel.innerText = value;
  }

  setScore(value) {
    this.score = value;
    this.scoreLabel.innerText = value.toString();
  }

  getScore() {
    return this.score;
  }

  showIndicator() {
    this.indicator.style.setProperty("--indicatorColor", 'red');
  }

  hideIndicator() {
    this.indicator.style.setProperty("--indicatorColor", 'transparent');
  }
}
