type rtndata = {
    college:string;
    noOfStudent:number;
}[];

interface Student {
    id: number;
    name: string;
    college: string;
    age:number;
    gender?:string;
}


function filrt(stdts:Student[]){
    let clg:string[] =[];
    let returnArray:rtndata = [];
    for(let stdt of stdts){
        console.log(stdt.college);
        if(!clg.includes(stdt.college)) {
            clg.push(stdt.college);
            returnArray.push({
                college : stdt.college,
                noOfStudent : 1
            })
        }
        else {
            returnArray.map((item) => {
                if(item.college == stdt.college) {
                    item.noOfStudent++;
                }
            })         
        }       
    }
    console.log(returnArray); 
}


let mystudents: Student[] = [
    {
            id: 1,
            name: 'Rohan',
            college: 'GEC',
            age: 20
    },
    {
            id: 2,
            name: 'Rahul',
            college: 'GEC',
            age: 20
    },
    {
            id: 3,
            name: 'Ram',
            college: 'VVP',
            age: 20
    },
    {
            id: 4,
            name: 'Rakesh',
            college: 'DARSHAN',
            age: 20
    },
    {
        id: 5,
        name: 'Mohit',
        college: 'IITRajkot',
        age: 20
    },
];

console.log(filrt(mystudents));





