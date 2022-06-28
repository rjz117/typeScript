function longerWord(s1) {
    var s2;
    var s3;
    s2 = s1.split(" ");
    s3 = s2;
    var rtnstr = "";
    s3.sort(function (a, b) { return a.length - b.length; });
    for (var _i = 0, s3_1 = s3; _i < s3_1.length; _i++) {
        var i = s3_1[_i];
        if (i.length == (s3[s3.length - 1]).length) {
            rtnstr = rtnstr + " " + i;
        }
    }
    return rtnstr;
}
var str = document.getElementById("mytxt");
var rtnstring = document.getElementById("rtnstr");
var btn = document.getElementById("myBtn");
btn.addEventListener("click", function () {
    if (!str.value) {
        return rtnstring.innerHTML = "Please type something :(";
    }
    rtnstring.innerHTML = longerWord(str.value);
});
longerWord("asdsad asdasdasd Ravirajsinhzala1");
