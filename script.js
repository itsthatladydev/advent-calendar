// Create script.js and add this code
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal")
  const modalTitle = document.getElementById("modal-title")
  const modalContent = document.getElementById("modal-content")
  const closeBtn = document.querySelector(".close")

  // reset calendar
  document
    .getElementById("resetCalendar")
    .addEventListener("click", resetCalendar)

  function resetCalendar() {
    // Clear localStorage
    localStorage.removeItem("openedDoors")

    // Reset all doors
    const doors = document.querySelectorAll(".door")
    doors.forEach((door) => {
      door.classList.remove("opened", "opening")
    })
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

  function initializeCalendar() {
    // Create array of numbers 1-24
    const numbers = Array.from({ length: 24 }, (_, i) => i + 1)

    // Shuffle the numbers
    const shuffledNumbers = shuffleArray([...numbers])

    // Get all doors
    const doors = document.querySelectorAll(".door:not(.empty)")

    // Assign shuffled numbers to doors
    doors.forEach((door, index) => {
      const number = shuffledNumbers[index]
      door.textContent = number
      door.dataset.day = number // Store original day number

      // Add click handler with correct content mapping
      door.addEventListener("click", () => {
        const day = parseInt(door.dataset.day)
        handleDoorClick(door, day)
      })
    })
  }

  // Check if door can be opened
  function canOpenDoor(day) {
    const today = new Date()
    const isDecember = today.getMonth() === 11
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
      //   if (!canOpenDoor(day)) {
      //     door.classList.add("disabled")
      //   }

      door.addEventListener("click", () => handleDoorClick(door, day))
    })
  }

  // Handle door click
  function handleDoorClick(door, day) {
    if (door.classList.contains("opened")) {
      showModal(day)
      return
    }

    // Add opening animation
    door.classList.add("opening")

    // Wait for animation to complete
    door.addEventListener(
      "animationend",
      () => {
        door.classList.remove("opening")
        door.classList.add("opened")
        saveOpenedDoor(day)
        showModal(day)
      },
      { once: true }
    )
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
})
