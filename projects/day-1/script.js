const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Random size between 2px and 10px
    const size = Math.random() * 8 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // Random position across the width of the screen
    snowflake.style.left = `${Math.random() * 100}vw`;
    
    // Random animation duration between 5s and 15s
    snowflake.style.animationDuration = `${Math.random() * 10 + 5}s`;
    
    snowContainer.appendChild(snowflake);
    
    // Remove the snowflake after it falls
    setTimeout(() => {
        snowflake.remove();
    }, (Math.random() * 10 + 5) * 1000);
}

// Create a snowflake every 100ms
setInterval(createSnowflake, 100);