import ExampleObject from '../objects/exampleObject';
import { Sleeping } from 'matter';

export default class tutorial extends Phaser.Scene {
    
    private background: any;
    private gametitle: any;
    private instruction: any;
    private notepad: any;
    private playbutton: any;
    private readytext: any;
    private title: any;
    private totorialset: any;
    private music: any;
    private startsound: any;
    constructor(){
        super({key: 'tutorial'});
    }

    create(){
        //set background
        this.background=this.add.image(0,0, "background-1");
        this.background.setScale(2);

        //set game title
        this.gametitle = this.add.image(500,50,"gametitle");
        this.gametitle.setScale(0.7);

        //adjust the sub-title and add image
        this.title = this.add.image(170,200,"t-title");
        this.title.setScale(0.8);
        this.instruction = this.add.image(170,400,"instruction");
        this.instruction.setScale(1.5);

        //add tutorial note image
        this.notepad = this.add.image(700,400,"notepad");
        this.notepad.setScale(0.5);
        this.totorialset = this.add.image(500,780,"tutorialset");
        this.readytext = this.add.image(530,950,"readytext");
        this.playbutton=this.add.image(120,930,"play")
         .setInteractive()
         .on('pointerdown', ()=>this.goToGame());
        this.playbutton.setScale(0.45);
        
        //add tutorial BGM
        this.startsound = this.sound.add("start");
        this.music = this.sound.add("tutorial_music");
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
    }
    goToGame(){
        this.startsound.play();
        this.scene.start('MainScene');
        this.music.stop();
    }

}