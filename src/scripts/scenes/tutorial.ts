import ExampleObject from '../objects/exampleObject';

export default class tutorial extends Phaser.Scene {
    private playbutton: any;

    constructor(){
        super({key: 'tutorial'});
    }

    create(){
        this.add.text(0, 0, "tutorial", {fill: '#000000', fontSize: '20px'});
        
        this.playbutton=this.add.image(100,100,"play")
         .setInteractive()
         .on('pointerdown', ()=>this.goToGame());
        this.playbutton.setScale(0.75);
    }

    update(){
        
    }

    goToGame(){
        this.scene.start('MainScene');
    }

}