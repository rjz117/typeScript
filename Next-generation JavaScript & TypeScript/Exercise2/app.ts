type studentswithres =
    {
    id: number;
    name: string;
    collage: string;
    marks: number;
    results: string;
    }[];

let students:{
        id: number;
        name: string;
        collage: string;
        marks: number;
    }[] = [
    {
        id: 1,
        name: "Mohan",
        collage: "VVP",
        marks: 60
    },
    {
        id: 2,
        name: "Rakesh",
        collage: "VVP",
        marks: 71
    },
    {
        id: 3,
        name: "Manohar",
        collage: "GECR",
        marks: 80
    },
    {
        id: 4,
        name: "Rohan",
        collage: "GECR",
        marks: 70
    },
    {
        id: 5,
        name: "Mohit",
        collage: "DARSHAN",
        marks: 31
    }
];

function fun1(std : typeof students): typeof students {
    let rtnstds:typeof students = [];
    let studs = std.map((cur) => {
        if(cur.marks > 70) {
            rtnstds = [ ...rtnstds, cur];
        }
        return rtnstds;
    })
    return rtnstds;
}

function names(std: typeof students):string[] {
    let rtnnames:string[] = [];
    for (let rtn of std) {
        rtnnames.push(rtn.name);
    }
    return rtnnames;
}

function results(std : typeof students): studentswithres {
    let rtnstds: studentswithres = [];
    let studs = std.map((cur) => {
        if(cur.marks > 33) {
            rtnstds = [...rtnstds, {...cur, results : "PASS"}];
        }
        else {
            rtnstds = [...rtnstds, {...cur, results : "FAIL"}];
        }
        return rtnstds;
    })
    return rtnstds;
}

console.log(results(students));
