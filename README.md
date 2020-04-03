The error was
        
    Unhandled rejection ValidationError: status: Expected string but received a boolean.
    
   
It means something wrong with status field in Contact Schema.
 
 And when I check on the documentation of package validator, it said the validator only work with String type
 
 However, the status field is Boolean type, so we should convert it into String for validation.
 
  