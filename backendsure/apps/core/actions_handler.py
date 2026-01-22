from dataclasses import dataclass
from typing import Optional
from apps.core.models import UserAction

@dataclass
class UserActionData:
    action_title: str
    action_type: str
    action_description: Optional[str] = None  # Made optional with default value
    
    
class UserActionLogger:
    def __init__(self, action: UserActionData):
        self.action = action
        
    def log_user_action(self):
        UserAction.objects.create(
            action_title=self.action.action_title,
            action_type=self.action.action_type,
            action_description=self.action.action_description
        )

# Correct usage - create instance first, then call method
#action_data = UserActionData(
#    action_title="Created new policy",
#    action_type="Create",
#    action_description="James has created a new credit life policy for customer"
#)

#logger = UserActionLogger(action_data)
#logger.log_user_action()