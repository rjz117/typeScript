function fun1() :void {
    console.log("Hello World!");
}

function fun2(ar : string, func: () => void) {
    console.log(ar);
    func();
}

fun2("prominentpixel", fun1);