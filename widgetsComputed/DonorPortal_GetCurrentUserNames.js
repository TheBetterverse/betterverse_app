return function(nameChoice){

    let currentUser = this.DonorPortal_GetCurrentUser()
    
    let firstName = currentUser.firstName
    let lastName = currentUser.lastName
    let username = currentUser.username
    let fullName = firstName + " " + lastName

    if(nameChoice == "first"){
        if(firstName != null){
            return firstName
        }   

        if(firstName == null){
            return username
        }   
    }

    else if(nameChoice == "last"){
        if(lastName != null){
            return lastName
        }   

        if(lastName == null){
            return username
        } 
    }

    else if(nameChoice == "full"){
        if(fullName != null){
            return fullName
        }   

        if(fullName == null){
            return username
        } 
    }

    else if(nameChoice == "username"){
        if(username != null){
            return username
        }   

        if(username == null){
            return null
        } 
    }

    else{
        return null
    }

}