function inp(str: string) {
    let rtnstr:string = "";

    for(let i=0; i <= str.length; i++) {
        if(rtnstr.includes(str.charAt(i)) == false){
            rtnstr += str[i];
        }
    }
    console.log(rtnstr); 
    
}

inp("ravirajsinh");