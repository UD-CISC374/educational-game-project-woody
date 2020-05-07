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
  private scoreLabel;
  private score: number;
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
    this.soda=this.physics.add.image(-780,500,"soda");
    this.soda.setScale(0.05);
    this.soda.setInteractive();
    this.input.setDraggable(this.soda);

    //Set up dragging into basket
    this.input.on('pointerdown', this.startDrag, this);
    this.physics.add.overlap(this.electronic, this.computer, this.pick, undefined, this);
    this.physics.add.overlap(this.recycle, this.soda, this.pick, undefined, this);
    this.physics.add.overlap(this.recycle, this.pbottle, this.pick, undefined, this);
    this.physics.add.overlap(this.harmful, this.battery, this.pick, undefined, this);
    this.physics.add.overlap(this.medical, this.syringe, this.pick, undefined, this);
    this.score = 0;
    this.scoreLabel = this.add.text(900, 5, "SCORE " + this.score);
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
    if (allThere == this.items.length -1 ){
      
      this.add.image(500,500,"congrats");
      this.add.text(400,750,"Your Score is "+ this.score);
      this.done == true;
    }
    else{
      this.done == false;
    }

  }

  goHome(){
    this.scene.start('tutorial');

  }
  movetrash(trash){
    if(trash.y >500){
      trash.x += 1

    };
    if(trash.x > 1200){
      var randomx = Phaser.Math.Between(-50, -200);
      trash.x = randomx;
      var randomy = Phaser.Math.Between(500, 800);
      trash.y = randomy;
      this.score -= 40;
    }
  }

  pick(trashbin,item){
    if (item == this.battery){
      this.index = "battery";
      if (this.items.indexOf(this.index) != -1){
        this.battery.disableBody(true,true);
        this.alltrash.push("shirt");
        this.score += 50;
      }
      else{
        this.battery.setX(200);
        this.battery.setY(60);
      }
    }

    if (item == this.pbottle){
      this.index = "pbottle";
      if (this.items.indexOf(this.index) != -1){
        this.pbottle.disableBody(true,true);
        this.alltrash.push("pbottle");
        this.score += 50;
      }
      else{
        this.pbottle.setX(360);
        this.pbottle.setY(60);
      }
    }

    if (item == this.soda){
      this.index = "soda";
      if (this.items.indexOf(this.index) != -1){
        this.soda.disableBody(true,true);
        this.alltrash.push("soda");
        this.score += 50;
      }
      else{
        this.soda.setX(360);
        this.soda.setY(140);
      }
    }

    if (item == this.computer){
      this.index = "computer";
      if (this.items.indexOf(this.index) != -1){
        this.computer.disableBody(true,true);
        this.alltrash.push("computer");
        this.score += 50;
      }
      else{
        this.computer.setX(195);
        this.computer.setY(145);
      }
    }
    if (item == this.syringe){
      this.index = "syringe";
      if (this.items.indexOf(this.index) != -1){
        this.syringe.disableBody(true,true);
        this.alltrash.push("syringe");
        this.score += 50;
      }
      else{
        this.syringe.setX(500);
        this.syringe.setY(700);
      }
    }
    
  }

  startDrag(pointer, targets){
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj=targets[0];
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);

  }
  doDrag(pointer){
    this.dragObj.x=pointer.x;
    this.dragObj.y=pointer.y;
  }
  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size ||2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }
  stopDrag(){
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
  }
}
