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
    1: "Skill-Boosting Tip: Powerful Git command of the day - 'git rebase' to keep commits clean!",
    2: "JavaScript Mini Challenge: Solve a puzzle like finding the most frequent character in a string.",
    3: "Productivity Tip: Learn a useful VS Code shortcut to speed up your workflow.",
    4: "Python Puzzle: Sort a list of dictionaries by key in a single line.",
    5: "GitHub Copilot Hack: Discover a hidden feature to maximize your coding efficiency.",
    6: "Motivational Quote: 'Do it scared!' Reflect on your tech journey and set a new goal.",
    7: "Stress-Busting Tip: Take a screen break every 20 minutes and do a quick stretch!",
    8: "Imposter Syndrome Reminder: Feel the fear and code anyway - you’re doing great!",
    9: "Self-Care Checklist: Hydrate, take eye breaks, and remember to enjoy the process!",
    10: "Plan B Moment: Watch an inspiring story of someone who transitioned into tech.",
    11: "Holiday Coding Meme: Enjoy a funny coding meme to lighten your day!",
    12: "CSS Snow Animation: Create a simple falling snow effect with CSS - festive and fun!",
    13: "JavaScript Tree Generator: Create a holiday tree with ornaments using DOM manipulation.",
    14: "Holiday Coding Playlist: Listen to a playlist of lo-fi and holiday tunes while coding.",
    15: "Virtual Dev Trivia: Test your tech history knowledge with a quick trivia quiz.",
    16: "Resume Optimization Tip: Learn how to highlight project impact effectively.",
    17: "LinkedIn Makeover: Refresh your profile to attract recruiters.",
    18: "Interview Prep Mini Guide: Get tips for tackling technical interview questions.",
    19: "GitHub Profile Tips: Showcase your best projects on your GitHub profile.",
    20: "Networking Icebreaker: Sample LinkedIn message for connecting with industry peers.",
    21: "Reflection Prompt: Celebrate your small wins and review your 2024 career goals.",
    22: "Mini Project Idea: Build a fun project, like a simple game or holiday-themed app.",
    23: "Code Confession: Share a funny coding mistake - we’ve all been there!",
    24: "Gift to Future You: Write a letter with your hopes and dreams for next year.",
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
