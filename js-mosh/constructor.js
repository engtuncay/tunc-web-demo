
// factory function

// function createCircle(radius) {
//     return {
//         radius,
//         draw: function() {
//             console.log("draw by factory function");
//         }
//     };
// }

// const circle = createCircle(10);

// Constructor function
function Circle (radius) {
    console.log('this',this);
    this.radius = radius;
    this.draw = function(){
        console.log('draw from Constructor sytle');
    }
}

// burada new operatörünü unutursak, circle fonksiyondaki this değişkeni global window objesini gösterir
// this olmazsa hata vermesi lazım , editörün.
const circle = new Circle(10);


circle.draw();

