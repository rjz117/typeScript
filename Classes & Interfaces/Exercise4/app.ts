class Product {
    constructor (private id:number, private name:string,private amount:number, private stock:number) {
        
    }
    get getid () {
        return this.id;
    }

    get getname () {
        return this.name;
    }

    get getamount () {
        return this.amount;
    }

    get getstock () {
        return this.stock;
    }

    set setId (value: number) {
        this.id = value;
    }

    set setName (value: string) {
        this.name = value;
    }

    set setAmount (value: number) {
        this.amount = value;
    }

    set setStock (value: number) {
        this.stock = value;
    }

    increseStock(quantity: number) {
        let curStock:number = this.getstock;
        let finalStock = curStock + quantity;
        this.setStock = finalStock;
    }

    decreseStock(quantity: number) {
        let curStock:number = this.getstock;
        if(quantity > curStock) {
            throw new Error("you entered more than current stock.")
        }
        let finalStock = curStock - quantity;
        this.setStock = finalStock;
    }

}

let pen = new Product(1,"pen",10,50);
let laptop = new Product(2,"laptop",5,50000);
let smartwatch = new Product(3,"smartwatch",15,6000);
pen.increseStock(10);
pen.decreseStock(6);
console.log(pen.getstock);


//tsc -t es5 script.ts thi cmand works for compilation