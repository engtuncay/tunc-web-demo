const circle = {

    radius: 1,
    location: {
        x:1,
        y:2
    }
    // is a member function , then we refer to it as a method
    // bazı js kaynakları bütün üyeleri property diyor.
    ,draw: function(){
        console.log('draw');
    }
}

// yukarıda süslü parentez blogu object literal oluyor.


circle.draw();
