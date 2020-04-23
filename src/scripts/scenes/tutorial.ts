import ExampleObject from '../objects/exampleObject';

export default class tutorial extends Phaser.Scene {
    private playbutton: any;
    private background: any;
    constructor(){
        super({key: 'tutorial'});
    }

    create(){
        this.background=this.add.image(0,0, "background");
        this.background.setScale(2);
        this.add.text(450, 200, "tutorial", {fill: '#000000', fontSize: '20px'});
        
        this.playbutton=this.add.image(500,500,"play")
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