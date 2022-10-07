return function(){

    if(this.isUserAnonymous){
        $setCurrentSubTab('-N4IRMyIAw-t4q0VNr0C' , '-Mx_5FLL2jlxjXYUMdIL', true)
    }

    else if (!this.isUserAnonymous){
        $setCurrentSubTab('-MyvUthgoLrT0z0HdIX9' , '-Mx_5FLL2jlxjXYUMdIL', true)
    }

    else {
        return null
    }

}