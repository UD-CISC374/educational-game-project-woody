import ExampleObject from '../objects/exampleObject';

export default class tutorial extends Phaser.Scene {
    private playbutton: any;
    private background: any;
    private notepad: any;
    private title: any;
    private readytext: any;
    private totorialset: any;
    private gametitle: any;
    constructor(){
        super({key: 'tutorial'});
    }

    create(){
        this.background=this.add.image(0,0, "background");
        this.background.setScale(2);

        this.gametitle = this.add.image(500,50,"gametitle");
        this.gametitle.setScale(0.7);

        this.title = this.add.image(170,200,"t-title");
        this.title.setScale(0.8);

        this.notepad = this.add.image(700,400,"notepad");
        this.notepad.setScale(0.5);
        this.totorialset = this.add.image(500,780,"tutorialset");
        this.readytext = this.add.image(530,950,"readytext");
        this.playbutton=this.add.image(120,930,"play")
         .setInteractive()
         .on('pointerdown', ()=>this.goToGame());
        this.playbutton.setScale(0.45);
    }

    update(){
        
    }

    goToGame(){
        this.scene.start('MainScene');
    }

}