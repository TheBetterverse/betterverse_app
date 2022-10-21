(async () => {
//
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    document.getElementById("bv__backtodashboard__button").style.transition = "opacity 0.5s linear 0s";

	document.getElementById("bv__backtodashboard__button").style.opacity = 1;
    

})();