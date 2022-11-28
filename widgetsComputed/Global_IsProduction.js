return function(){

    const url = window.location.href;

    if(url.includes("give.betterverse.app")){
        return true
    }
    else{
        return false
    }
    return
}