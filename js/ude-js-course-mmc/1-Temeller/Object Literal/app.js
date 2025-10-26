let value;

const programmer = {
    name : "Mustafa Murat Coşkun",
    age : 25,
    email: "coskun.m.murat@gmail.com",
    langs : ["Python","Java","Javascript"],

    address : {
        city : "Ankara",
        street : "Bahçelievler"
    },

    work : function(){
        console.log("Programcı Çalışıyor...");
    },

    falseProp:false,
    nullProp:null,
    fullProp:'Deneme',
}

value = programmer;

value = programmer.email; // Genel olarak
value = programmer["email"];


if(programmer['nanProp']){
    console.log("nan prop var")
}else{
    console.log('nanProp null veya undefined veya false:',programmer['nanProp']);
}

if(programmer['falseProp']){
    console.log("false prop var ve true")
}else{
    console.log('false prop : false veya undefined',programmer['falseProp']);
}

if(programmer['falseProp']===undefined ){
    console.log("false prop undefined")
}else{ // output
    console.log('false prop defined :',programmer['falseProp']);
}

// Null olan property defined 
if(programmer['nullProp']===undefined ){
    console.log("null prop undefined")
}else{ // output
    console.log('null prop defined :',programmer['nullProp']); // null
}

if(programmer['nullProp']){
    console.log("null prop true değerinde")
}else{ // output
    console.log('null prop undefined veya null veya false : ',programmer['nullProp']); 
}

if(programmer['fullProp']){
    console.log("full prop true veya dolu")
}else{
    console.log('full prop: false veya undefined veya null',programmer['fullProp']);
}


value = programmer.langs;


value = programmer.address.city;


programmer.work();


const programmers = [
    {name: "Mustafa Murat",age:25},
    {name : "Oğuz",age : 25}
];

value = programmers[0].name;


console.log(value);