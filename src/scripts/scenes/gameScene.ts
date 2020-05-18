import ExampleObject from '../objects/exampleObject';

export default class gameScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private battery: any;
  private belt: any;
  private computer: any;
  private electronic: any;
  private harmful: any;
  private medical: any;
  private pbottle: any;
  private recycle: any;
  private soda: any;
  private syringe: any;
  private background: any;
  private totorial_button: any;
  private items: Array<any>;
  private trashbin: any;
  private alltrash: any;
  private done: any;
  private index: any;
  private dragObj: any;
  private hint:any;
  private scoreLabel: any;
  private score: number;
  private music: any;
  private correctsound: any;
  private wrongsound: any;
  private dragsound: any;
  private startsound: any;
  constructor() {
    super({ key: 'MainScene' });
  }
  create() {
    
    //Add background and home button
    this.background=this.add.image(500,500,"background");
    this.belt=this.add.tileSprite(500,685,1280, 650,"belt");
    
    this.totorial_button=this.add.image(50,50, "home")
    .setInteractive()
    .on('pointerdown', ()=>this.goHome());
    this.totorial_button.setScale(0.5);
    
    this.done=false;
    //Add hint
    this.hint = this.add.image(500,50,"hint");
    this.hint.setScale(0.7);

    //Make list of items for this level
    this.items = ["computer", "pbottle", "soda","battery","syringe"];
    this.trashbin = ["harmful", "recycle", "electronic", "medical"];

    //Make list of items selected
    this.alltrash = [];
    
    //Make recycle
    this.recycle=this.physics.add.image(100,250,"recycle");
    this.recycle.setScale(0.2);
    //Make electronic
    this.electronic = this.physics.add.image(350,215,"electronic");
    this.electronic.setScale(0.2);
    //Make harmful
    this.harmful = this.physics.add.image(600,215,"harmful");
    this.harmful.setScale(0.2);
    //Make medical
    this.medical = this.physics.add.image(850,250,"medical");
    this.medical.setScale(0.2);

    //Make battery
    this.battery=this.physics.add.image(100,760,"battery");
    this.battery.setScale(0.2);
    this.battery.setInteractive();
    this.input.setDraggable(this.battery);

    //Make computer
    this.computer=this.physics.add.image(-420, 600, "computer");
    this.computer.setScale(0.2);
    this.computer.setInteractive();
    this.input.setDraggable(this.computer);

    //Make pbottle
    this.pbottle=this.physics.add.image(-200,700,"pbottle");
    this.pbottle.setScale(0.1);
    this.pbottle.setInteractive();
    this.input.setDraggable(this.pbottle);

    //Make syringe
    this.syringe=this.physics.add.image(-650,700,"syringe");
    this.syringe.setScale(0.2);
    this.syringe.setInteractive();
    this.input.setDraggable(this.syringe);

    //Make soda
    this.soda=this.physics.add.image(-780,560,"soda");
    this.soda.setScale(0.05);
    this.soda.setInteractive();
    this.input.setDraggable(this.soda);
    
    //Set up dragging into basket
    this.input.on('pointerdown', this.startDrag, this);
    this.physics.add.overlap(this.recycle, this.soda, this.pick, undefined, this);
    this.physics.add.overlap(this.harmful, this.soda, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.electronic, this.soda, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.medical, this.soda, this.wrongpick, undefined, this);

    this.physics.add.overlap(this.harmful, this.computer, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.recycle, this.computer, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.electronic, this.computer, this.pick, undefined, this);
    this.physics.add.overlap(this.medical, this.computer, this.wrongpick, undefined, this);

    this.physics.add.overlap(this.harmful, this.battery, this.pick, undefined, this);
    this.physics.add.overlap(this.recycle, this.battery, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.electronic, this.battery, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.medical, this.battery, this.wrongpick, undefined, this);

    this.physics.add.overlap(this.harmful, this.pbottle, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.recycle, this.pbottle, this.pick, undefined, this);
    this.physics.add.overlap(this.electronic, this.pbottle, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.medical, this.pbottle, this.wrongpick, undefined, this);

    this.physics.add.overlap(this.medical, this.syringe, this.pick, undefined, this);
    this.physics.add.overlap(this.harmful, this.syringe, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.recycle, this.syringe, this.wrongpick, undefined, this);
    this.physics.add.overlap(this.electronic, this.syringe, this.wrongpick, undefined, this);
    this.score = 0;
    this.scoreLabel = this.add.text(875, 5, "SCORE " + this.score);

    this.music = this.sound.add("gameplay");
    var musicConfig ={
      mute: false,
      volume: 1,
      rate:1,
      detune:0,
      seek:0,
      loop: false,
      delay:0
    }
    this.music.play(musicConfig);

    this.correctsound = this.sound.add("correct");
    this.wrongsound = this.sound.add("wrong");
    this.dragsound = this.sound.add("drag");
    this.startsound = this.sound.add("start");
  }

  update() {
    
    this.belt.tilePositionX -= 1;
    this.movetrash(this.soda);
    this.movetrash(this.syringe);
    this.movetrash(this.pbottle);
    this.movetrash(this.computer);
    this.movetrash(this.battery);

    this.scoreLabel.text = "SCORE: " + this.score;

    let allThere = 0;
    for (let index = 0; index < this.items.length; index++){
      allThere = this.alltrash.includes(this.items[index]) + allThere;
    }
    if (allThere == this.items.length ){
      
      this.add.image(500,500,"congrats");
      this.add.text(400,750,"Your Score is "+ this.score);
      this.done == true;
    }
    else{
      this.done == false;
    }

  }

  goHome(){
    this.startsound.play();
    this.scene.start('tutorial');
    this.music.stop();

  }
  movetrash(trash){
    if(trash.y > 480){
      trash.x += 1

    };
    if(trash.x > 1200){
      this.wrongsound.play();
      var randomx = Phaser.Math.Between(-50, -200);
      trash.x = randomx;
      var randomy = Phaser.Math.Between(500, 800);
      trash.y = randomy;
      this.scorecal(-20);
    }
  }
  wrongpick(trashbin,item){
      
      (async () => { 
        this.battery.disableBody(true,true);
        this.wrongsound.play();
        var randomx = Phaser.Math.Between(-50, -800);
        item.x = randomx;
        var randomy = Phaser.Math.Between(500, 800);
        item.y  = randomy;

        await this.delay(1000);
        this.battery.disableBody(false,false);
        this.scorecal(-40);
    })();
      
      
      
  }
  pick(trashbin,item){
    if (item == this.battery){
      this.index = "battery";
      if (this.items.indexOf(this.index) != -1){
        this.battery.disableBody(true,true);
        this.alltrash.push("battery");
        this.correctsound.play();
        this.scorecal(50);
      }
    }

    if (item == this.pbottle){
      this.index = "pbottle";
      if (this.items.indexOf(this.index) != -1){
        this.pbottle.disableBody(true,true);
        this.alltrash.push("pbottle");
        this.correctsound.play();
        this.scorecal(50);
      }
    }

    if (item == this.soda){
      this.index = "soda";
      if (this.items.indexOf(this.index) != -1){
        this.soda.disableBody(true,true);
        this.alltrash.push("soda");
        this.correctsound.play();
        this.scorecal(50);
      }
    }

    if (item == this.computer){
      this.index = "computer";
      if (this.items.indexOf(this.index) != -1){
        this.computer.disableBody(true,true);
        this.alltrash.push("computer");
        this.correctsound.play();
        this.scorecal(50);
      }
    }
    if (item == this.syringe){
      this.index = "syringe";
      if (this.items.indexOf(this.index) != -1){
        this.syringe.disableBody(true,true);
        this.alltrash.push("syringe");
        this.correctsound.play();
        this.scorecal(50);
      }
    }
    
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
  scorecal(value){
    if((this.score + value) < 0){
      this.score = 0;
    }
    else{
      this.score += value;
    }

  }
  startDrag(pointer, targets){
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj=targets[0];
    this.input.on('pointermove', this.doDrag, this);
    this.dragsound.play();
    this.input.on('pointerup', this.stopDrag, this);

  }
  doDrag(pointer){
    this.dragObj.x=pointer.x;
    this.dragObj.y=pointer.y;
  }
  stopDrag(){
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
  }
}
