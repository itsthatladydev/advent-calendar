import random

def generate_elf_name(name):
    festive_prefixes = ['Tinsel', 'Sparkle', 'Jingle', 'Twinkle', 'Holly', 'Candy', 'Sugar', 'Merry']
    festive_suffixes = ['Bells', 'Cookie', 'Stars', 'Toes', 'Mittens', 'Cheer', 'Socks']
    
    # Convert name to title case and get first letter
    name = name.title()
    first_letter = name[0]
    
    # Select random elements
    prefix = random.choice([p for p in festive_prefixes if p[0] != first_letter])
    suffix = random.choice(festive_suffixes)
    
    # Combine elements to create elf name
    elf_name = f"{prefix} {name[0]}{suffix}"
    
    return elf_name

# Get user input and generate name
name = input("Enter your name to get your elf name: ")
print(f"🎄 Your elf name is: {generate_elf_name(name)} 🎄")