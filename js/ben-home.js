// a minigame
const player = document.getElementById("guy");

const leftImage = 'img/guy-left.png'
const rightImage = 'img/guy-right.png'

const link = document.getElementById("links");

const messageText = document.getElementById("message");
class Message {
  constructor(text, duration) {
    this.text = text;
    this.duration = duration;
    this.startTime = performance.now();
  }
}
let messages = [];

let PlayerPosX = 400;
let PlayerPosY = 0;
let LastPlayerPosX = 400;
let LastPlayerPosY = 0;
let PlayerSpeedX = 0;
let PlayerSpeedY = 0;

let scrollX = 0;
let scrollSpeed = 0;
let mouseX = 0;
let mouseY = 0;

const runAcceleration = 4
const jumpPower = 10
const gravity = 0.5
const frictionX = 0.5

const PlayerWidth = 50;
const PlayerHeight = 75; 

const viewX = 1200;

let touchingGround = false;


let platforms = [
  { x: 0, y: 500, width: 2000, height: 1000, color: "green", effect: "none" },
  {
    "x": 1380.4946701947306,
    "y": 360.70266753415746,
    "width": 100,
    "height": 250,
    "color": "green",
    "effect": "none"
},
{
  "x": 2152.964174142151,
  "y": 432.53090435914123,
  "width": 100,
  "height": 25,
  "color": "green",
  "effect": "none"
},
{
  "x": 2352.8339458180344,
  "y": 500,
  "width": 500,
  "height": 599,
  "color": "green",
  "effect": "none"
},
{
  "x": 2730.7976211640644,
  "y": 495.63145353455127,
  "width": 100,
  "height": 25,
  "color": "blue",
  "effect": "launch"
},
{
  "x": 3026.0276399192553,
  "y": 224.9404289118348,
  "width": 100,
  "height": 25,
  "color": "green",
  "effect": "none"
},
{
  "x": 3401.193387620262,
  "y": 512.8547579298831,
  "width": 100,
  "height": 25,
  "color": "green",
  "effect": "none"
},
{
  "x": 3698.542073692442,
  "y": 476.79465776293824,
  "width": 100,
  "height": 25,
  "color": "green",
  "effect": "none"
},
{
  "x": 3698.542073692442,
  "y": 476.79465776293824,
  "width": 2000,
  "height": 1000,
  "color": "green",
  "effect": "none"
},
{
  "x": 4235.60658508381,
  "y": 468.7813021702838,
  "width": 100,
  "height": 25,
  "color": "red",
  "effect": "kill"
},
{
  "x": 4611.530461723221,
  "y": 473.78964941569285,
  "width": 100,
  "height": 25,
  "color": "red",
  "effect": "kill"
},
{
  "x": 5000.653496215045,
  "y": 474.79131886477467,
  "width": 500,
  "height": 25,
  "color": "red",
  "effect": "kill"
},
{
  "x": 5136.4974019515475,
  "y": 339.5659432387312,
  "width": 100,
  "height": 25,
  "color": "green",
  "effect": "none"
},
{
  "x": 5795.4028359572485,
  "y": 542.9048414023373,
  "width": 150,
  "height": 1000,
  "color": "green",
  "effect": "none"
},
{
  "x": 5913.599830948901,
  "y": 363.6060100166945,
  "width": 1000,
  "height": 1000,
  "color": "green",
  "effect": "none"
}];

let textBoxes = [
  {
    x: 100,
    y: 525,
    text: "My name is Ben, and I'm a CS student at MJC. To see more about me, use the arrow keys to move arround and jump.",
    width: 200,
    backgroundColor: "white",
    textColor: "black"
  },
  {
    "x": 1427.4311182072604,
    "y": 550.4229017566688,
    "text": "I first got into programming when I was quite young, because I wanted to make a game.  I started with Lua, which thinking back was probably not the easiest way to start, but I loved it.",
    "width": 200,
    "backgroundColor": "white",
    "textColor": "black"
},
{
  "x": 2300.276392308591,
  "y": 566.0377358490566,
  "width": 200,
  "text": "I continued to make games using Lua for a while, but my interest in coding really got a boost when I joined my high school's robotics team. Robots are cool. Coding robots is even cooler.",
  "backgroundColor": "white",
  "textColor": "black",
},
{
  "x": 3630.7314323657,
  "y": 504.8414023372287,
  "width": 200,
  "text": "At this point there was no going back.  I was hooked.  I took Intro to Programming at MJC while I was still in high school, and I've been learning more ever since",
},
{
  "x": 4724.312100721917,
  "y": 500,
  "width": 200,
  "text": "At MJC, I met a lot of great people, and got involved with a project called CommuinityALI as a backend web developer.",
  "backgroundColor": "white",
  "textColor": "black",
},
{
  "x": 5852.097609849285,
  "y": 450.016694490818,
  "width": 200,
  "text": "Currently, I'm finishing up my last few classes at MJC while working on projects, being the president of the MJC Computer Science Club, and looking for a job.",
  "backgroundColor": "white",
  "textColor": "black",
}
]

function addMessage(text, duration) {
  messages.push(new Message(text, duration));
  if (messages.length === 1) {
    message.innerHTML = text;
  }
  messageStartTime = performance.now();
  messageDuration = duration;
}

function gameLoop() {
  requestAnimationFrame(gameLoop); 
  // do accelerations and friction
  if (keys.ArrowLeft){
    PlayerSpeedX -= runAcceleration;
    // change the image to face left
    player.src = leftImage;
  }
  if (keys.ArrowRight){
    PlayerSpeedX += runAcceleration;
    // change the image to face right
    player.src = rightImage;
  }
  if (keys.ArrowUp){
    if (touchingGround){
      PlayerSpeedY -= jumpPower;
    }
    else{ // provide force equal to 1/2 of gravity
      PlayerSpeedY -= gravity/2;
    }
  }
  PlayerSpeedX *= frictionX;
  PlayerSpeedY += gravity;
  // update position
  PlayerPosX += PlayerSpeedX;
  PlayerPosY += PlayerSpeedY;

  // check for collision
  touchingGround = false;
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    if (
      PlayerPosX < platform.x + platform.width &&
      PlayerPosX + PlayerWidth > platform.x &&
      PlayerPosY < platform.y + platform.height &&
      PlayerPosY + PlayerHeight > platform.y
    ) {
      // collision detected!
      if (platform.effect === "kill") {
        addMessage("You died!", 2000);
        PlayerPosX = 400;
        PlayerPosY = 0;
        LastPlayerPosX = 400;
        LastPlayerPosY = 0;
        PlayerSpeedX = 0;
        PlayerSpeedY = 0;
      }
      else if (platform.effect === "launch") {
        PlayerSpeedY = -20;
      }
      else if (LastPlayerPosY + PlayerHeight <= platform.y) {
        // player was above the platform
        PlayerPosY = platform.y - PlayerHeight;
        PlayerSpeedY = 0;
        touchingGround = true;
      } else if (LastPlayerPosY >= platform.y + platform.height){
        // player was below the platform
        PlayerPosY = platform.y + platform.height;
        PlayerSpeedY = 0;
      }
      else if (LastPlayerPosX + PlayerWidth <= platform.x) {
        // player was to the left of the platform
        PlayerPosX = platform.x - PlayerWidth;
        PlayerSpeedX = 0;
      } else if (LastPlayerPosX >= platform.x + platform.width) {
        // player was to the right of the platform
        PlayerPosX = platform.x + platform.width;
        PlayerSpeedX = 0;
      }

    }
  }
  // save the player's position for next frame
  LastPlayerPosX = PlayerPosX;
  LastPlayerPosY = PlayerPosY;

  // scroll the screen elastically to keep the player in the center
  const scrollTarget = PlayerPosX - 400;
  if (Math.abs(scrollTarget - scrollX) > 25) {
    scrollSpeed += (scrollTarget - scrollX) / 100;
  }
  scrollSpeed *= 0.9;
  scrollX += scrollSpeed;



  // update the player's position scaled to the screen
  windowsize = window.innerWidth;
  const ratio = windowsize / viewX;
  player.style.left = ((PlayerPosX - scrollX) * ratio) + "px";
  player.style.top = (PlayerPosY * ratio) + "px";
  // scale the player to the screen
  player.style.width = PlayerWidth * ratio + "px";
  player.style.height = PlayerHeight * ratio + "px";

  // display the platforms as rectangles
  const container = document.getElementById("platforms");
  container.innerHTML = "";
  for (let i = 0; i < platforms.length; i++) {
    const platform = platforms[i];
    const div = document.createElement("div");
    div.className = "platform";
    div.style.position = "absolute";
    div.style.left = ((platform.x - scrollX) * ratio) + "px";
    div.style.top = (platform.y * ratio) + "px";
    div.style.width = (platform.width * ratio) + "px";
    div.style.height = (platform.height * ratio) + "px";
    div.style.backgroundColor = platform.color;
    container.appendChild(div);
  }

  // display the text boxes as rectangles
  const container2 = document.getElementById("textBoxes");
  container2.innerHTML = "";
  for (let i = 0; i < textBoxes.length; i++) {
    const textBox = textBoxes[i];
    const div = document.createElement("div");
    div.className = "textBox";
    div.style.position = "absolute";
    div.style.left = ((textBox.x - scrollX) * ratio) + "px";
    div.style.top = (textBox.y * ratio) + "px";
    div.style.width = (textBox.width * ratio) + "px";
    div.style.backgroundColor = textBox.backgroundColor;
    div.style.color = textBox.textColor;
    div.innerHTML = textBox.text;
    container2.appendChild(div);
  }

  // position the link
  link.style.position = "absolute";
  link.style.left = ((6300 - scrollX) * ratio) + "px";
  link.style.top = (450 * ratio) + "px";
  link.style.width = (300 * ratio) + "px";

  

  // display message[0] until messageDuration is over
  if (messages.length > 0) {
    if (performance.now() - messages[0].startTime > messages[0].duration) {
      messages.shift();
      if (messages.length > 0) {
        message.innerHTML = messages[0].text;
        messageStartTime = performance.now();
        messageDuration = messages[0].duration;
      } else {
        message.innerHTML = "";
      }
    }
  }

  // detect if the player has fallen off the screen
  if (PlayerPosY > 2000) {
    addMessage("You fell off the screen!", 2000);
    PlayerPosX = 400;
    PlayerPosY = 0;
    LastPlayerPosX = 400;
    LastPlayerPosY = 0;
    PlayerSpeedX = 0;
    PlayerSpeedY = 0;
  }
  
}

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  mouseDown: false
};

document.addEventListener("keydown", (event) => {
  if (event.key in keys) {
    keys[event.key] = true;
  }
});


document.addEventListener("keyup", (event) => {
  if (event.key in keys) {
    keys[event.key] = false;
  }
});
// make sure the page cannot be manually scrolled
document.body.style.overflow = "hidden";
// make sure the page cannot be zoomed
document.body.style.touchAction = "none";

addMessage("Press the arrow keys to move arround", 5000);

// start the game loop
gameLoop();