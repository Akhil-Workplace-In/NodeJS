function add(a, b){
    return a + b;
}

function sub(a, b){
    return a -b;
}



module.exports = { // Here we're exporting our functionalities(exporting mutiple functions)
    add, sub,
}

module.exports.multi = (a, b) => a * b; // can be exported as single function at a time