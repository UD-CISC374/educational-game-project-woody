import ExampleObject from '../objects/exampleObject';

export default class gameScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private battery: any;
  private computer: any;
  private electronic: any;
  private harmful: any;
  private medical: any;
  private pbottle: any;
  private recycle: any;
  private soda: any;
  private background: any;
  private totorial_button: any;
  private items: Array<any>;
  private trashbin: any;
  private alltrash: any;
  private done: any;
  private index: any;
  private dragObj: any;
  
  constructor() {
    super({ key: 'MainScene' });
  }
  create() {
    
    //Add background and home button
    this.background=this.add.image(200, 200, "background");

    this.totorial_button=this.add.image(70, 300, "home")
    .setInteractive()
    .on('pointerdown', ()=>this.goHome());
    this.done=false;
    //Add instruction
    this.add.text(5,350,"Drag trash to trash bin.",{fill:"#000000", fontSize:"16px"});

    //Make list of items for this level
    this.items = ["computer", "pbottle", "soda","battery"];
    this.trashbin = ["harmful", "recycle", "electronic", "medical"];

    //Make list of items selected
    this.alltrash = [];
    
    //Make recycle
    this.recycle=this.physics.add.image(80,360,"recycle");
    this.recycle.setScale(0.5);
    //Make electronic
    this.electronic = this.physics.add.image(160,360,"electronic");
    this.electronic.setScale(0.5);
    //Make harmful
    this.harmful = this.physics.add.image(240,360,"harmful");
    this.harmful.setScale(0.5);
    //Make medical
    this.medical = this.physics.add.image(320,360,"medical");
    this.medical.setScale(0.5);

    //Make battery
    this.battery=this.physics.add.image(200,60,"battery");
    this.battery.setScale(0.15);
    this.battery.setInteractive();
    this.input.setDraggable(this.battery);

    //Make computer
    this.computer=this.physics.add.image(320, 240, "computer");
    this.computer.setScale(0.2);
    this.computer.setInteractive();
    this.input.setDraggable(this.computer);

    //Make pbottle
    this.pbottle=this.physics.add.image(285,60,"pbottle");
    this.pbottle.setScale(0.15);
    this.pbottle.setInteractive();
    this.input.setDraggable(this.pbottle);

    //Make soda
    this.soda=this.physics.add.image(230,240,"soda");
    this.soda.setScale(0.2);
    this.soda.setInteractive();
    this.input.setDraggable(this.soda);

    //Set up dragging into basket
    this.input.on('pointerdown', this.startDrag, this);
    this.physics.add.overlap(this.electronic, this.computer, this.pick, undefined, this);
    this.physics.add.overlap(this.recycle, this.soda, this.pick, undefined, this);
    this.physics.add.overlap(this.recycle, this.pbottle, this.pick, undefined, this);
    this.physics.add.overlap(this.harmful, this.battery, this.pick, undefined, this);

  }

  update() {
    let allThere = 0;
    for (let index = 0; index < this.items.length; index++){
      allThere = this.alltrash.includes(this.items[index]) + allThere;
    }
    if (allThere == this.items.length){
      this.done == true;
      this.add.text(200,200,"Done",{fill:"#000000", fontSize:"16px"});

    }
    else{
      this.done == false;
    }
  }

  goHome(){
    this.scene.start('tutorial');

  }

  pick(trashbin,item){
    if (item == this.battery){
      this.index = "battery";
      if (this.items.indexOf(this.index) != -1){
        this.battery.disableBody(true,true);
        this.alltrash.push("shirt");
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
      }
      else{
        this.computer.setX(195);
        this.computer.setY(145);
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

  stopDrag(){
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove', this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
  }
}
