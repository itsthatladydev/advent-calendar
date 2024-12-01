def create_border(width, height):
    # Top border
    print("*" * width)
    
    # Middle sections with sides
    for _ in range(height):
        print("*" + " " * (width-2) + "*")
    
    # Bottom border
    print("*" * width)

def holiday_card():
    # Card dimensions
    width = 50
    height = 8
    
    # Get user names
    sender_name = input("Enter your name (sender): ")
    recipient_name = input("Enter recipient's name: ")
    
    # Store the greeting messages
    greetings = [
        f"Dear {recipient_name},",
        "",
        "Season's Greetings!",
        "",
        "Wishing you joy and happiness",
        "during this festive season",
        "and throughout the coming year!",
        "",
        "🎄 Happy Holidays! 🎄",
        "",
        f"With warm wishes,",
        f"{sender_name}"
    ]
    
    # Print top border
    print("*" * width)
    
    # Print messages centered
    for message in greetings:
        print("*" + message.center(width-2) + "*")
    
    # Print bottom border
    print("*" * width)

if __name__ == "__main__":
    holiday_card()