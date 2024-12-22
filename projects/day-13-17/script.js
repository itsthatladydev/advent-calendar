document.addEventListener('DOMContentLoaded', () => {
    const totalBudgetInput = document.getElementById('total-budget');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const remainingBudgetDisplay = document.getElementById('remaining-budget');

    let totalBudget = 0;
    let totalExpenses = 0;

    addExpenseButton.addEventListener('click', () => {
        const expenseName = expenseNameInput.value.trim();
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if (expenseName === '' || isNaN(expenseAmount) || expenseAmount <= 0) {
            alert('Please enter a valid expense name and amount.');
            return;
        }

        totalExpenses += expenseAmount;
        updateRemainingBudget();

        // Clear input fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    });

    totalBudgetInput.addEventListener('input', () => {
        totalBudget = parseFloat(totalBudgetInput.value) || 0;
        updateRemainingBudget();
    });

    function updateRemainingBudget() {
        const remaining = totalBudget - totalExpenses;
        remainingBudgetDisplay.textContent = remaining >= 0 ? remaining.toFixed(2) : '0';
    }

    // Add confetti handler
    const celebrateButton = document.getElementById('celebrate');
    celebrateButton.addEventListener('click', () => {
        confetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FF0000', '#00FF00', '#0000FF', '#FF69B4']
        });
    });

    // Holiday Jokes Array
    const holidayJokes = [
        "What does Santa suffer from if he gets stuck in a chimney? Claustrophobia!",
        "What do you call an elf who sings? A wrapper!",
        "What do snowmen eat for breakfast? Snowflakes!",
        "Why did Rudolph get bad grades in school? Because he went down in history!",
        "What do you call Santa when he stops moving? Santa Pause!",
        "What kind of photos do elves take? Elfies!",
        "What did the gingerbread man put on his bed? Cookie sheets!",
        "What do you call an obnoxious reindeer? Rude-olph!"
    ];

    const jokeBtn = document.getElementById('joke-btn');
    const jokeText = document.getElementById('joke-text');

    jokeBtn.addEventListener('click', () => {
        const randomJoke = holidayJokes[Math.floor(Math.random() * holidayJokes.length)];
        jokeText.textContent = randomJoke;
    });
});