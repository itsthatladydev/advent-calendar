
def get_user_input(prompt):
    return input(prompt)

def main():
    print("Welcome to the Holiday Mad Libs Game!")
    print("Please provide the following words:")

    noun = get_user_input("Enter a noun: ")
    adjective = get_user_input("Enter an adjective: ")
    place = get_user_input("Enter a place: ")
    plural_noun = get_user_input("Enter a plural noun: ")
    verb_past = get_user_input("Enter a past tense verb: ")
    favorite_food = get_user_input("Enter your favorite holiday food: ")
    holiday = get_user_input("Enter a holiday: ")

    story = f"""
    On {holiday}, my family and I went to {place}.
    We saw many {adjective} {plural_noun} and enjoyed eating {favorite_food}.
    Everyone was happy because we all {verb_past} together.
    It was the best {holiday} ever!
    """

    print("\nHere's your holiday story:")
    print(story)

if __name__ == "__main__":
    main()