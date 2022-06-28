type product = {
    name: string;
    stock: number; 
    original: number;
    discount?: number;
}[]

type endproduct = {
    name: string;
    stock: number; 
    original: number;
    discount?: number;
    salePrice : number;
    total: number;
}[]

let products : product= [
  { name: 'Mobile', stock: 3, original: 4000 },
  { name: 'Laptop', stock: 1, original: 10000, discount: 0.1 },
  { name: 'Mouse', stock: 4, original: 299.99 },
  { name: 'Keyboard', stock: 1, original: 299.99, discount: 0.8 },
  { name: 'Headphone', stock: 2, original: 199.99, discount: 0.65 }
];

function calculateSalePriceAndTotals(product : product) {
    let rtnprd :endproduct = [];
    let pds = product.map((cur) => {
        let salePrice :number;
        let total :number;
        const {name, stock, original, discount} = cur;
        if(discount) {
            console.log("discount available");
            
            salePrice = original- (discount*original);
            total = salePrice*stock;
        }
        else { 
            salePrice = original;
            total = salePrice*stock;
        }
        rtnprd = [ ...rtnprd, { ...cur, salePrice, total}]
        return rtnprd;
    })
    return rtnprd;
    
}

console.log(calculateSalePriceAndTotals(products));

