class LevelFactory {
	//dimensions - [int, int] - [width,height]
	static build(dimensions) {
		let level = [];
		const START_CHANCE = 40;
		const CHANCE_INCREMENT = 10;
		let currChance = START_CHANCE;
		for(var i=0; i<dimensions[1]; i++) {
			level.push([]);
			for(var j=0; j<dimensions[0]; j++) {
				let randChance = Math.floor(Math.random() * 100);
				level[i].push(randChance <= currChance);
				currChance = randChance <= currChance ? START_CHANCE : currChance + CHANCE_INCREMENT;
			}
		}
		return level;
	}
}

export default LevelFactory;