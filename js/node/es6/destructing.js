
// Object Destructing
const degerler = {
    prop1: 'deger1',
    prop2: 'deger2',
    prop3: {
        isim: 'mehmet'
    }
};

const { prop3 } = degerler; // degerler objesinden deger3 ü al.
console.log(prop3);


// Array Destructing
const arrDegerler = [1,2,3];
const [ deger1, deger2, deger3 ] = arrDegerler; // array indexine göre sırayla atama yapar
console.log(deger1);
console.log(deger2);
console.log(deger3);
