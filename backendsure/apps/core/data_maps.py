from dataclasses import dataclass

@dataclass
class LoggedInUserDataMap:
    """
    A class to represent a data map for user-related data.
    This class can be extended to include more fields as needed.
    """
    id: str
    access: str
    refresh: str
    username: str
    email: str
    role: str
    name: str
    phone_number: str = None
    gender: str = None