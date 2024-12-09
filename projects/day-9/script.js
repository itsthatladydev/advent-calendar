const globe = document.querySelector('.globe');
const globeRect = globe.getBoundingClientRect();
const centerX = globeRect.width / 2;
const centerY = globeRect.height / 2;
const radius = globeRect.width / 2;

let speedMultiplier = 1;
const speedDisplay = document.getElementById('speed-display');
const slowerButton = document.getElementById('slower');
const fasterButton = document.getElementById('faster');

function updateSpeedDisplay() {
    speedDisplay.textContent = `${speedMultiplier}x`;
}

slowerButton.addEventListener('click', () => {
    if (speedMultiplier > 0.25) {
        speedMultiplier -= 0.25;
        updateSpeedDisplay();
    }
});

fasterButton.addEventListener('click', () => {
    if (speedMultiplier < 3) {
        speedMultiplier += 0.25;
        updateSpeedDisplay();
    }
});

// Add character movement
const characters = document.querySelectorAll('.character');

characters.forEach((character, index) => {
    const angle = (index / characters.length) * Math.PI * 2;
    const distance = radius * 0.5;
    let rotation = 0;
    
    function moveCharacter() {
        rotation += 0.005 * speedMultiplier;
        const x = centerX + Math.cos(rotation + angle) * distance;
        const y = centerY + Math.sin(rotation + angle) * distance;
        
        character.style.transform = `translate(${x - 15}px, ${y - 15}px) rotate(${rotation * 57.3}deg)`;
        requestAnimationFrame(moveCharacter);
    }
    
    moveCharacter();
});

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    
    // Random angle for circular distribution
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    
    // Convert polar to cartesian coordinates
    const startX = centerX + distance * Math.cos(angle);
    const startY = 0;
    
    snowflake.style.width = Math.random() * 4 + 2 + 'px';
    snowflake.style.height = snowflake.style.width;
    snowflake.style.left = startX + 'px';
    snowflake.style.top = startY + 'px';
    
    globe.appendChild(snowflake);
    
    let posY = startY;
    let posX = startX;
    let speed = (1 + Math.random()) * speedMultiplier;
    let wobble = 0;
    
    function fall() {
        posY += speed;
        wobble += 0.02;
        posX += Math.sin(wobble) * 0.5;
        
        // Check if snowflake is within globe bounds
        const distanceFromCenter = Math.sqrt(
            Math.pow(posX - centerX, 2) + 
            Math.pow(posY - centerY, 2)
        );
        
        if (distanceFromCenter > radius) {
            globe.removeChild(snowflake);
            return;
        }
        
        snowflake.style.transform = `translate(${posX - startX}px, ${posY}px)`;
        requestAnimationFrame(fall);
    }
    
    fall();
}

setInterval(createSnowflake, 100);
