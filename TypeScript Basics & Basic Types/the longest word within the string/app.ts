function longerWord (s1:string):string  {
    let s2:string[];
    let s3:string[];
    s2 = s1.split(" ");
    s3 = s2;
    let rtnstr:string = ""; 
    s3.sort((a, b) => {return a.length - b.length});    
    
    for(let i of s3) {
        if(i.length == (s3[s3.length -1]).length) {
            rtnstr = rtnstr+" "+i;
        }
    }
    return rtnstr;
}
const str = document.getElementById("mytxt")! as HTMLInputElement;
const rtnstring = document.getElementById("rtnstr")!;
const btn = document.getElementById("myBtn")!;

btn.addEventListener("click", () => {
    if(!str.value) {
        return rtnstring.innerHTML = "Please type something :("; 
    }
    rtnstring.innerHTML = longerWord(str.value);
})

longerWord("asdsad asdasdasd Ravirajsinhzala1");
