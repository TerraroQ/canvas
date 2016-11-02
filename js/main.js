// Getting the elemnets by id and setting them to variables.
var ctx = document.getElementById('main').getContext('2d');
var title = document.getElementById('title')
var txt = document.getElementById('textbox')

// Setting the starting position for the player.
var playerX = 3,
	playerY = 5,
	keys = [];

// Array with the all the tiles:
// 0 = ground 
// 1 = walls
// 1 > npc
var map = [
	  [1,1,1,1,1,1,1,1,1,1],
	  [1,0,0,0,0,0,0,0,2,1],
	  [1,0,0,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,0,0,1],
	  [1,1,1,1,1,1,1,1,1,1]
	];
//setting the length and width of the canvas based on the ammount of tiles(only squares and rectangles supported at the moment).
ctx.canvas.width  = map[0].length * 40;
ctx.canvas.height = map.length * 40;

// Drawing the map by looping through the map array. 
function drawmap() {
	// 2 for loops that loop through the map array.
	for (var i = 0; i < map.length; i++) {
	    for (var j = 0; j < map[i].length; j++) {
			// Drawing the the ground if the tile has a value of 0
	    	if (map[i][j] === 0) {
				ctx.fillStyle = '#FFFFFF';
		        ctx.fillRect(j * 40, i * 40, 40, 40);
	        }
			// Drawing the player if the i and j variables are the same as playerX and playerY.
	    	if (playerX === i && playerY === j) {
		    	ctx.fillStyle = '#FFFF00';
		        ctx.fillRect(j * 40, i * 40, 40, 40);
	    	}
			// Drawing the walls if the tile has a value of 1;
	        if (map[i][j] === 1) {
	            ctx.fillStyle = '#000000';
	            ctx.fillRect(j * 40, i * 40, 40, 40);
	        }
			// Drawing Npc nr 1 if the tile has a value of 2.
			if (map[i][j] === 2) {
	            ctx.fillStyle = '#0000FF';
	            ctx.fillRect(j * 40, i * 40, 40, 40);
	        }
	    }
	}
}

// Checking for collision and returning true if there is a collision between player and a wall or npc.
function collision() {
	// Clearing the textbox.
	title.innerText= "";
	txt.innerText= "";
	var location = map[playerX][playerY];
	// if the player tries to move to a wall tile, colision gets set to false and the player gets set back.
	if (location === 1) {
		return true;
	} else
	if (location > 1) {
		npc(location);
		return true;
	}
}

// Initial caller function for the canvas game, also functions as a updater when a keypress is registered.
function init() {
	// Drawing the map on loading the canvas.
    removeEventListener('load', init);
    drawmap();
	// EventListener waiting for a keypress to update the canvas.
    addEventListener("keyup", function(e) {
      switch(e.keyCode) {
        case 37:
        	playerY--;
			if (collision() === true) {
				playerY++;
			}
        break;
        case 39:
         	playerY++;
			if (collision() === true) {
				playerY--;
			}
        break;
        case 38:
         	playerX--;
			if (collision() === true) {
				playerX++;
			}
        break;
        case 40:
         	playerX++;
			if (collision() === true) {
				playerX--;
			}
        break;
      }
      drawmap();
    });
  };

// Npc function witch gets the Npc id from the map array.
function npc(npcNr)	{
	// Switch that lets you add the conversation.
	switch(npcNr) {
		case 2:
			title.innerText= "meneer 1"
			// Start the conversation with as many options as you want.
			txt.innerText= "test";
		break
	}
}