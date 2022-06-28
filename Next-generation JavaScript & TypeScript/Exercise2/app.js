var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var students = [
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
function fun1(std) {
    var rtnstds = [];
    var studs = std.map(function (cur) {
        if (cur.marks > 70) {
            rtnstds = __spreadArray(__spreadArray([], rtnstds, true), [cur], false);
        }
        return rtnstds;
    });
    return rtnstds;
}
function names(std) {
    var rtnnames = [];
    for (var _i = 0, std_1 = std; _i < std_1.length; _i++) {
        var rtn = std_1[_i];
        rtnnames.push(rtn.name);
    }
    return rtnnames;
}
function results(std) {
    var rtnstds = [];
    var studs = std.map(function (cur) {
        if (cur.marks > 33) {
            rtnstds = __spreadArray(__spreadArray([], rtnstds, true), [__assign(__assign({}, cur), { results: "PASS" })], false);
        }
        else {
            rtnstds = __spreadArray(__spreadArray([], rtnstds, true), [__assign(__assign({}, cur), { results: "FAIL" })], false);
        }
        return rtnstds;
    });
    return rtnstds;
}
console.log(results(students));
