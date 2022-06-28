interface Readable {
    read():string;
}

interface Writable extends Readable {
    write(value:string):void;
}

class Book implements Writable {
    data:string;
    constructor(txt:string) {
        this.data = txt;
    }    
    read() {
        return this.data;
    }
    write(txt:string) {
        this.data += txt;
    }
}

let book1 = new Book("this is my book.");
console.log(book1.read());
book1.write("But i havent read it.");
console.log(book1.read());
