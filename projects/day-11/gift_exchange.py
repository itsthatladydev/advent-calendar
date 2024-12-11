# Write a Python script that pairs people for a holiday gift exchange 

def get_people():
    people = []
    while True:
        name = input("Enter a name (or press Enter to finish): ")
        if name == "":
            break
        people.append(name)
    return people

def get_pairs(people):
    pairs = []
    for i in range(len(people)):
        giver = people[i]
        receiver = people[(i + 1) % len(people)]
        pairs.append((giver, receiver))
    return pairs

def main():
    people = get_people()
    pairs = get_pairs(people)
    for giver, receiver in pairs:
        print(f"{giver} is giving a gift to {receiver}")

if __name__ == "__main__":
    main()
