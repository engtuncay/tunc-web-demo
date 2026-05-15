import { FiMeta } from "orak-util-ts";
import { Fkw } from "./Fkw.js";

let mesaj: string = "Merhaba TypeScript!";
console.log(mesaj);

//git clone https://github.com/kullaniciadi/repo-adi.git

let fkw = new Fkw({ name : 'Ali' , surname : 'Veli'} );

let fim = FiMeta.create('name');

console.log(fkw.getFimVal(fim));
