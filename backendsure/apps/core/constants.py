from enum import Enum

class GenderTypes(Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    

class SchemeTypes(Enum):
    GROUP_SCHEME = "Group"
    INDIVIDUAL_SCHEME = "Individual"
    
    @classmethod
    def choices(cls):
        return [(x.value, x.value) for x in cls ]
    

class UserActionTypes(Enum):
    DELETE = "Delete"
    CREATED = "Create"
    UPDATED = "Update"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    
class DependentTypes(Enum):
    SPOUSE = "Spouse"
    CHILD = "Child"
    SON = "Son"
    DAUGHTER = "Daughter"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    
class ExtendedDependentTypes(Enum):
    PARENT = "Parent"
    GRAND_PARENT = "Grand Parent"
    NIECE = "Niece"
    NEPHEW = "Nephew"
    AUNT = "Aunt"
    UNCLE = "Uncle"
    IN_LAW = "In Law"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    
class RelationshipTypes(Enum):
    SPOUSE = "Spouse"
    CHILD = "Child"
    SON = "Son"
    DAUGHTER = "Daughter"
    PARENT = "Parent"
    GRAND_PARENT = "Grand Parent"
    NIECE = "Niece"
    NEPHEW = "Nephew"
    AUNT = "Aunt"
    UNCLE = "Uncle"
    IN_LAW = "In Law"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    
class PolicyStatuses(Enum):
    DRAFT = "Draft"
    CREATED = "Created"
    ACTIVE = "Active"
    CANCELLED = "Cancelled"
    LAPSED = "Lapsed"
    DEACTIVATED = "Deactivated"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    
    
class PaymentStatuses(Enum):
    PAID = "Paid"
    FAILED = "Failed"
    FUTURE = "Future"
    PENDING = "Pending"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]
    


class ClaimStatuses(Enum):
    PAID = "Paid"
    FAILED = "Failed"
    FUTURE = "Future"
    PENDING = "Pending"
    PENDING_VERIFICATION = "Pending Verification"
    
    @classmethod
    def choices(cls):
        return [(key.value, key.value) for key in cls]