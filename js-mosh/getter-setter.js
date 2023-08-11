
// Js fonksiyon klasik şekilde tanımlanabilir (class gibi) veya bir değişkene atanabilir

// değişkene atandığında fonksiyon ismi değişkenin ismi gibi olur yazılmaz , fonksiyon tanımı lamda ya benzer

function Circle(radius){
    this.radius = radius;

    let defaultLocation = { x:0, y:0 };

    // this.getDefaultLocation = function(){
    //   return this.defaultLocation;
    // }

    // bunun yerine

    Object.defineProperty(this ,'defaultLocation'
        , { get: function() { // readonly property
                return defaultLocation;
            }, set: function(value){
                this.defaultLocation = value;
            }
        });

    this.draw = function(){
        console.log("draw yeni aaaa");
    };


};

const circle = new Circle(10);
console.log(circle);
// defineProperty ile tanımladıktan sonra böyle kullanabiliriz
circle.defaultLocation;
circle.draw();