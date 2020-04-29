import ExampleObject from '../objects/exampleObject';

export default class tutorial extends Phaser.Scene {
    
    private background: any;
    private gametitle: any;
    private instruction: any;
    private notepad: any;
    private playbutton: any;
    private readytext: any;
    private title: any;
    private totorialset: any;

    constructor(){
        super({key: 'tutorial'});
    }

    create(){
        this.background=this.add.image(0,0, "background-1");
        this.background.setScale(2);

        this.gametitle = this.add.image(500,50,"gametitle");
        this.gametitle.setScale(0.7);

        this.title = this.add.image(170,200,"t-title");
        this.title.setScale(0.8);
        this.instruction = this.add.image(170,400,"instruction");
        this.instruction.setScale(1.5);
  
        this.notepad = this.add.image(700,400,"notepad");
        this.notepad.setScale(0.5);

        this.totorialset = this.add.image(500,780,"tutorialset");
        this.readytext = this.add.image(530,950,"readytext");
        this.playbutton=this.add.image(120,930,"play")
         .setInteractive()
         .on('pointerdown', ()=>this.goToGame());
        this.playbutton.setScale(0.45);
    }
    goToGame(){
        this.scene.start('MainScene');
    }

}