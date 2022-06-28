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
var products = [
    { name: 'Mobile', stock: 3, original: 4000 },
    { name: 'Laptop', stock: 1, original: 10000, discount: 0.1 },
    { name: 'Mouse', stock: 4, original: 299.99 },
    { name: 'Keyboard', stock: 1, original: 299.99, discount: 0.8 },
    { name: 'Headphone', stock: 2, original: 199.99, discount: 0.65 }
];
function saleProduct(product) {
    var rtnprd = [];
    var pds = product.map(function (cur) {
        var salePrice;
        var total;
        if (cur.discount) {
            console.log("discount available");
            salePrice = cur.original - (cur.discount * cur.original);
            total = salePrice * cur.stock;
        }
        else {
            salePrice = cur.original;
            total = salePrice * cur.stock;
        }
        rtnprd = __spreadArray(__spreadArray([], rtnprd, true), [__assign(__assign({}, cur), { salePrice: salePrice, total: total })], false);
        return rtnprd;
    });
    return rtnprd;
}
console.log(saleProduct(products));
