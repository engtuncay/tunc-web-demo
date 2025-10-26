// 3 farklı stilde metod tanımlayabiliriz
let obj1 = {
    name:"tuncay",
    hello(){
        console.log('hello');
    }
}

let objAlt1 = {
    name:"tuncay",
    hello : () => {
        console.log('hello');
    }
}

let objAlt2 = {
    name:"tuncay",
    hello : function () {
        console.log('hello');
    }
}

console.log('obj1 hello()');
obj1.hello();

let fnHello = obj1.hello;
console.log('fnHello()');
fnHello();

