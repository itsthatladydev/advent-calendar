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
    1: "Create a simple snowfall effect on a webpage with CSS and JavaScript.",
    2: "Use Python to generate a text-based holiday greeting card with a festive ASCII border.",
    3: "Use CSS animations to create a string of blinking holiday lights.",
    4: "Use JavaScript to build a countdown timer that counts down to Christmas Day.",
    5: "Generate a holiday-themed 'elf name' based on a user's input with Python.",
    6: "Design a button that unwraps or glows when clicked.",
    7: "Use Javascript to show a random gingerbread or holiday cookie recipe with a click.",
    8: "Use Python to create a simple console-based quiz with holiday-themed questions and answers.",
    9: "Create a snow globe effect with JavaScript where snow falls within a 'globe' circle on the page.",
    10: "Use CSS to add a Santa hat filter to images, applying it to any image on hover.",
    11: "Write a Python script that pairs people for a holiday gift exchange.",
    12: "Let users drag ornaments onto a tree on a webpage.",
    13: "Create a CSS-only text effect where 'snow' appears to fall over the letters.",
    14: "Write a program that helps users calculate their holiday shopping budget.",
    15: "Add a confetti effect to a webpage that triggers when a button is clicked.",
    16: "Create a Mad Libs-style game with a holiday twist.",
    17: "Make a gingerbread man 'dance' when the user hovers over him using CSS animations.",
    18: "Display a random holiday joke each time a button is clicked.",
    19: "Build a program that randomly decides if a user is on the 'Naughty' or 'Nice' list based on their name.",
    20: "Let users draw unique snowflakes by clicking and dragging on a canvas element.",
    21: "Create a loading animation that resembles a wreath spinning or a blinking holiday wreath.",
    22: "Generate randomized Secret Santa assignments for a group, making sure no one gets themselves.",
    23: "Play different holiday sounds (like jingle bells or a 'Ho ho ho!') when buttons are clicked.",
    24: "A Python program that simulates Santa's route on a map for gift delivery on Christmas Eve."
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
    const month = today.getMonth()
    const date = today.getDate()
    
    // Allow November 30th or December dates
    const isValidMonth = month === 10 || month === 11 // 10 for November, 11 for December
    
    if (month === 10) {
      // Only allow November 30th
      return date === 30 && day === 1
    } else if (month === 11) {
      // December - normal advent calendar behavior
      return day <= date
    }
    
    return false
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
            showConfetti(); // Show confetti when a door is opened
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

  // Function to show confetti
  function showConfetti() {
    const colors = ['#ff0000', '#00ff00', '#ffd700']; // Red, green, gold
    const confettiContainer = document.getElementById('confetti-container');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50vw';
        confetti.style.top = '50vh';
        confetti.style.setProperty('--x', Math.random());
        confetti.style.setProperty('--y', Math.random());
        confettiContainer.appendChild(confetti);
    }
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 1000);
  }
})
