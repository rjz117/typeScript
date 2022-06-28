function inp(str) {
    var rtnstr = "";
    for (var i = 0; i <= str.length; i++) {
        if (rtnstr.includes(str.charAt(i)) == false) {
            rtnstr += str[i];
        }
    }
    console.log(rtnstr);
}
console.log("asd");
inp("ravirajsinh");
