var Book = /** @class */ (function () {
    function Book(txt) {
        this.data = txt;
    }
    Book.prototype.read = function () {
        return this.data;
    };
    Book.prototype.write = function (txt) {
        this.data += txt;
    };
    return Book;
}());
var book1 = new Book("this is my book.");
console.log(book1.read());
book1.write("But i havent read it.");
console.log(book1.read());
