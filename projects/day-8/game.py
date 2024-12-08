# Use Python to create a simple console-based quiz with holiday-themed questions and answers

# Define a list of 5 holiday-themed questions and answers
questions = [
    {
        "question": "What is the name of the red-nosed reindeer?",
        "answer": "Rudolph"
    },
    {
        "question": "In the song 'Jingle Bells', what type of sleigh is mentioned?",
        "answer": "one-horse open sleigh"
    },
    {
        "question": "What is the traditional Christmas plant with red berries called?",
        "answer": "holly"
    },
    {
        "question": "What popular Christmas beverage is also known as 'milk punch'?",
        "answer": "eggnog"
    },
    {
        "question": "In the movie 'Home Alone', where are the McCallisters going on vacation when they leave Kevin behind?",
        "answer": "Paris"
    }
]

# Welcome message
print("Welcome to the Holiday Quiz! Test your knowledge of holiday trivia.")

# function to run the quiz
def run_quiz(questions):
    score = 0
    for i, q in enumerate(questions):
        print(f"Question {i+1}: {q['question']}")
        user_answer = input("Your answer: ")
        if user_answer.lower() == q['answer'].lower():
            print("Correct!")
            score += 1
        else:
            print(f"Incorrect. The correct answer is: {q['answer']}")
    print(f"Quiz complete! You scored {score}/{len(questions)}.")

# Run the quiz
run_quiz(questions)