var Product = /** @class */ (function () {
    function Product(id, name, amount, stock) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.stock = stock;
    }
    Object.defineProperty(Product.prototype, "getid", {
        get: function () {
            return this.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "getname", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "getamount", {
        get: function () {
            return this.amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "getstock", {
        get: function () {
            return this.stock;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "setId", {
        set: function (value) {
            this.id = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "setName", {
        set: function (value) {
            this.name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "setAmount", {
        set: function (value) {
            this.amount = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "setStock", {
        set: function (value) {
            this.stock = value;
        },
        enumerable: false,
        configurable: true
    });
    Product.prototype.increseStock = function (quantity) {
        var curStock = this.getstock;
        var finalStock = curStock + quantity;
        this.setStock = finalStock;
    };
    Product.prototype.decreseStock = function (quantity) {
        var curStock = this.getstock;
        if (quantity > curStock) {
            throw new Error("you entered more than current stock.");
        }
        var finalStock = curStock - quantity;
        this.setStock = finalStock;
    };
    return Product;
}());
var myprd = new Product(1, "pen", 10, 50);
myprd.increseStock(10);
myprd.decreseStock(6);
console.log(myprd.getstock);
//tsc -t es5 script.ts thi cmand works for compilation
