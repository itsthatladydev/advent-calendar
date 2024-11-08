// Create script.js and add this code
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal")
  const modalTitle = document.getElementById("modal-title")
  const modalContent = document.getElementById("modal-content")
  const closeBtn = document.querySelector(".close")

  // Content for each day
  const adventContent = {
    1: "Start decorating for Christmas! 🎄 Coding tip: Keep your functions pure.",
    2: "Make hot chocolate ☕ Remember to take regular breaks while coding!",
    3: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
    4: "Git tip: Commit early, commit often! 💾",
    5: "Time to hang stockings! 🧦 Learn about semantic HTML today.",
    6: "What is Santa's favorite programming language? C# (C-sharp)! 🎅",
    7: "CSS tip: Flexbox makes layout easier! 📏",
    8: "Bake holiday cookies! 🍪 Don't forget to comment your code.",
    9: "JavaScript tip: Learn about async/await ⌛",
    10: "Write your wishlist! 📝 Also write your unit tests!",
    11: "Object-oriented programming is like gift wrapping 🎁",
    12: "Debug your Christmas lights! 💡 And your code too!",
    13: "REST API tip: Status codes are like Santa's list - they tell you if you've been good! 📋",
    14: "Make paper snowflakes! ❄️ Keep your code DRY (Don't Repeat Yourself)",
    15: "Array methods are like Christmas helpers - they do all the work! 🧝",
    16: "Send holiday cards! 💌 Send clean code to production!",
    17: "Security tip: Always validate user input! 🔒",
    18: "Build a snowman! ⛄ Build robust error handling!",
    19: "Performance tip: Optimize your loops! 🔄",
    20: "Wrap presents! 🎁 Wrap your code in try-catch blocks!",
    21: "ES6 tip: Use template literals for cleaner strings! 📝",
    22: "Make eggnog! 🥛 Make your code readable!",
    23: "Git tip: Never commit directly to main! 🌲",
    24: "Merry Christmas! 🎄 Remember: coding is about solving problems!",
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
    // Don't allow opening future doors
    // if (!canOpenDoor(day)) {
    //     return;
    // }

    saveOpenedDoor(day)
    door.classList.add("opened")

    // Show modal with content
    showModal(day)
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
})
