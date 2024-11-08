// Create script.js and add this code
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal")
  const modalTitle = document.getElementById("modal-title")
  const modalContent = document.getElementById("modal-content")
  const closeBtn = document.querySelector(".close")
  const doorSound = document.getElementById("doorSound")

  // reset calendar
  document
    .getElementById("resetCalendar")
    .addEventListener("click", resetCalendar)

  function resetCalendar() {
    // Clear localStorage
    localStorage.removeItem("openedDoors")
    // localStorage.removeItem("shuffledNumbers") // Clear shuffled numbers

    // Reset all doors
    const doors = document.querySelectorAll(".door")
    doors.forEach((door) => {
      door.classList.remove("opened", "opening")
    })

    initializeCalendar() // Regenerate numbers
  }

  // Content for each day
  const adventContent = {
    1: "JavaScript: Snowfall Animation – Create a simple snowfall effect on a webpage with CSS and JavaScript.",
    2: "Python: Holiday Greeting Card – Use Python to generate a text-based holiday greeting card with a festive ASCII border.",
    3: "CSS: Blinking Holiday Lights – Use CSS animations to create a string of blinking holiday lights.",
    4: "JavaScript: Countdown Timer to Christmas – Build a countdown timer that counts down to Christmas Day.",
    5: "Python: Elf Name Generator – Generate a holiday-themed 'elf name' based on a user's input.",
    6: "CSS & HTML: Festive Button Animation – Design a button that unwraps or glows when clicked.",
    7: "JavaScript: Random Gingerbread Recipe Display – Show a random gingerbread or holiday cookie recipe with a click.",
    8: "Python: Holiday Quiz Game – A simple console-based quiz with holiday-themed questions and answers.",
    9: "JavaScript: Digital Snow Globe – Create a snow globe effect with JavaScript where snow falls within a 'globe' circle on the page.",
    10: "CSS: Santa Hat Filter – Use CSS to add a Santa hat filter to images, applying it to any image on hover.",
    11: "Python: Gift Exchange Matcher – Write a program that pairs people for a holiday gift exchange.",
    12: "JavaScript: Interactive Tree Decorator – Let users drag ornaments onto a tree on a webpage.",
    13: "CSS: Snowy Text Effect – Create a CSS-only text effect where 'snow' appears to fall over the letters.",
    14: "Python: Holiday Budget Calculator – A program that helps users calculate their holiday shopping budget.",
    15: "JavaScript: Festive Confetti Explosion – Add a confetti effect to a webpage that triggers when a button is clicked.",
    16: "Python: Holiday Themed Mad Libs – Create a Mad Libs-style game with a holiday twist.",
    17: "CSS: Gingerbread Man Hover Animation – Make a gingerbread man 'dance' when the user hovers over him using CSS animations.",
    18: "JavaScript: Random Holiday Joke – Display a random holiday joke each time a button is clicked.",
    19: "Python: Naughty or Nice List – A program that randomly decides if a user is on the 'Naughty' or 'Nice' list based on their name.",
    20: "JavaScript: Snowflake Creator – Let users draw unique snowflakes by clicking and dragging on a canvas element.",
    21: "CSS & HTML: Holiday Wreath Loader – Create a loading animation that resembles a wreath spinning or a blinking holiday wreath.",
    22: "Python: Secret Santa Assignment – Generate randomized Secret Santa assignments for a group, making sure no one gets themselves.",
    23: "JavaScript: Holiday Soundboard – Play different holiday sounds (like jingle bells or a 'Ho ho ho!') when buttons are clicked.",
    24: "Python: Virtual Holiday Card – A Python script that generates a holiday card message with a colorful ASCII border or small animation."
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  // Update initializeCalendar function
  function initializeCalendar() {
    // Try to get stored shuffled numbers
    let shuffledNumbers = JSON.parse(localStorage.getItem("shuffledNumbers"));

    // Generate new numbers if none stored
    if (!shuffledNumbers) {
        const numbers = Array.from({ length: 24 }, (_, i) => i + 1);
        shuffledNumbers = shuffleArray([...numbers]);
        localStorage.setItem("shuffledNumbers", JSON.stringify(shuffledNumbers));
    }

    // Assign numbers to doors based on shuffled order
    const doors = document.querySelectorAll(".door:not(.empty)");
    doors.forEach((door, index) => {
        const dayNumber = shuffledNumbers[index];
        door.textContent = dayNumber;
        door.dataset.day = dayNumber; // Ensure `data-day` is set correctly

        // Only make the door active if it's before or equal to today's date
        if (canOpenDoor(dayNumber)) {
            door.classList.add("active");
            door.classList.remove("disabled");
        } else {
            door.classList.add("disabled");
        }

        // Attach click event using `dayNumber` to match displayed number
        door.addEventListener("click", () => handleDoorClick(door, dayNumber));
    });
}

  // Check if door can be opened
  function canOpenDoor(day) {
    const today = new Date()
    const isDecember = today.getMonth() === 10
    return isDecember && day <= today.getDate()
  }

  // Initialize doors
  function initDoors() {
    const doors = document.querySelectorAll(".door")
    const openedDoors = getOpenedDoors()

    doors.forEach((door) => {
      const day = parseInt(door.textContent)
      if (openedDoors.includes(day)) {
        door.classList.add("opened")
      }
      if (!canOpenDoor(day)) {
        door.classList.add("disabled")
      }

      door.addEventListener("click", () => handleDoorClick(door, day))
    })
  }

  // Handle door click
  function handleDoorClick(door, day) {
    // Only proceed if the door is active and can be opened based on the date
    if (!door.classList.contains("active") || !canOpenDoor(day)) {
        return; // Exit if the door cannot be opened
    }

    if (door.classList.contains("opened")) {
        showModal(day); // Show modal with the correct content
        return;
    }

    // Play door sound and open door animation
    doorSound.currentTime = 0;
    doorSound.play().catch((error) => console.log("Sound play failed:", error));

    // Stop the sound after 2 seconds
    setTimeout(() => {
      doorSound.pause();
    }, 2000);

    door.classList.add("opening");

    // Add opened class after animation, then show modal with correct content
    door.addEventListener(
        "animationend",
        () => {
            door.classList.remove("opening");
            door.classList.add("opened");
            saveOpenedDoor(day);
            showModal(day); // Use `day` to display correct content from `adventContent`
        },
        { once: true }
    );
}


  // Show modal
  function showModal(day) {
    modalTitle.textContent = `December ${day}`
    modalContent.textContent = adventContent[day] || "Surprise!"
    modal.style.display = "block"
  }

  // Add these helper functions after the showModal function
  function saveOpenedDoor(day) {
    const openedDoors = getOpenedDoors()
    if (!openedDoors.includes(day)) {
      openedDoors.push(day)
      localStorage.setItem("openedDoors", JSON.stringify(openedDoors))
    }
  }

  function getOpenedDoors() {
    return JSON.parse(localStorage.getItem("openedDoors") || "[]")
  }

  // Close modal
  closeBtn.onclick = () => (modal.style.display = "none")
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none"
  }

  // Initialize
  initDoors()
  initializeCalendar()

  const music = document.getElementById("holidayMusic")
  const musicToggle = document.getElementById("musicToggle")
  let isPlaying = false

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      music.pause()
      musicToggle.classList.remove("playing")
    } else {
      music.play()
      musicToggle.classList.add("playing")
    }
    isPlaying = !isPlaying
  })

  const gingerbread = document.getElementById("gingerbread");

// Function to make gingerbread man run across the screen
function runGingerbread() {
    gingerbread.classList.add("gingerbread-running"); // Start the animation
    
    // Remove the animation class after it ends to reset it
    setTimeout(() => {
        gingerbread.classList.remove("gingerbread-running");
    }, 5000); // Match the animation duration (5s)
}

// Trigger the animation periodically (e.g., every 20 seconds)
setInterval(runGingerbread, 20000); // Runs every 20 seconds
})
