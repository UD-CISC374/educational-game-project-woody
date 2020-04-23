import 'phaser';
import MainScene from './scenes/gameScene';
import PreloadScene from './scenes/preloadScene';
import tutorial from './scenes/tutorial';

import GameConfig = Phaser.Types.Core.GameConfig;

const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 1000;


const config: GameConfig = {
    backgroundColor: '#ffffff',
    scale: {
        parent: 'phaser-game',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, tutorial],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,

        }
    }
};

window.addEventListener('load', () => {
    window['game'] = new Phaser.Game(config);
});