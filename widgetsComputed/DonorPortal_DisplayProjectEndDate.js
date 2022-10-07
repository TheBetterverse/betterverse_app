return function(datetime){

    var date = new Date(datetime);
    var options = {
            //day: 'numeric',
            month: 'short',
            year: 'numeric',
        };

    var day = date.getDate()

    var monthYear = date.toLocaleDateString('en-us', options); // 10/29/2013

    var result = day + " " + monthYear

    return result

}