students = [
    {
        "premium": 4,
        "cover_amount": 5
    },
    {
        "premium": 4,
        "cover_amount": 5
    },
    {
        "premium": 4,
        "cover_amount": 15
    }
]

cvms = sum([student["cover_amount"] for student in students if student["cover_amount"] <= 10])
print(f"Cover Amount: {cvms}")