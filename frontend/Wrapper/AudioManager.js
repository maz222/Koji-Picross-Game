import Koji from '@withkoji/vcc';
import {Howl, Howler} from 'howler';

class AudioManager {
	constructor() {
		const VCC = Koji.config.sounds;
		this.files = [];
		//load music [0]
		this.files.push(
			new Howl({
				src:VCC.music,
				loop:true,
				volume:1
			})
		);
		//load level clear [1]
		this.files.push(
			new Howl({
				src:VCC.levelClear,
				volume:1
			})
		);
		//load click [2]
		this.files.push(
			new Howl({
				src:VCC.click,
				volume:1
			})
		);
        this.muted = false;
	}
	playAudio(index,loop=false) {
		if(!this.muted) {
			this.files[index].play();
		}
	}
	pauseAudio(index) {
		this.files[index].pause();
	}
	stopAudio(index) {
		this.files[index].stop();
	}
	pauseAll() {
		for(var i in this.files) {
			this.files[i].pause();
		}
	}
	stopAll() {
		for(var i in this.files) {
			this.files[i].stop();
		}
	}
}

export default AudioManager;