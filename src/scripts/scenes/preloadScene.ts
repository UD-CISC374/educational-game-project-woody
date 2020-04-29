export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {

    this.load.image("partyButton", "assets/images/partyButton.png");
    this.load.image("background", "assets/images/background.png");
    this.load.image("home","assets/images/home.png");
    this.load.image("electronic", "assets/images/electronic.png");
    this.load.image("medical", "assets/images/medical.png");
    this.load.image("harmful", "assets/images/harmful.png");
    this.load.image("recycle", "assets/images/recycle.png");
    this.load.image("play","assets/images/play.png");
    this.load.image("battery", "assets/images/battery.png");
    this.load.image("computer", "assets/images/computer.png");
    this.load.image("pbottle", "assets/images/p-bottle.png");
    this.load.image("soda", "assets/images/soda.png");
    this.load.image("syringe","assets/images/syringe.png");
    this.load.image("notepad","assets/images/notepad.png");
    this.load.image("t-title","assets/images/tutorial-font.png");
    this.load.image("readytext","assets/images/readytext.png");
    this.load.image("tutorialset","assets/images/tutorialset.png");
    this.load.image("gametitle","assets/images/gametitle.png");
  }

  create() {
    this.scene.start('tutorial');
  }
}
