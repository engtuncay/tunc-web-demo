// object literal syntax is not a good way to create an object

// solution is to use factory or constructor function
// factory function
function createCircle(radius) {
    return {
        radius,
        draw: function() {
            console.log("draw by factory function");
        }
    };
}

const circle = createCircle(10);

circle.draw();