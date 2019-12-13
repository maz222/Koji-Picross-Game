export default function draw() {
  background(250);

  push();
  const button = createButton('end the game???');
  button.position(window.innerWidth / 2 - button.width / 2, window.innerHeight / 2 - button.height / 2, 0);
  button.mousePressed(() => window.setAppView('postGame'));

  pop();
}