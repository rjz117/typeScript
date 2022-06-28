function fun1() {
    console.log("Hello World!");
}
function fun2(ar, func) {
    console.log(ar);
    func();
}
fun2("prominentpixel", fun1);
