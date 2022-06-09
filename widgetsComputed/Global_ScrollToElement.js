return function(id){

    var elmnt = document.getElementById(id);
    elmnt.scrollIntoView({ behavior: 'smooth' });

    return null
}