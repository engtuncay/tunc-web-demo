
// async kullanmadan önce 

getAnimals = () => {
    console.log('cat');
    setTimeout(() => {
        console.log('dog');
    },2000);
    console.log('butterfly');
}

getAnimals();

// cat butterfly dog sırasıyla output olarak çıkar  