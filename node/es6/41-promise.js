
// saf javascript yöntemiyle promise yapısına benzer kullanım
// const asenkronFonksiyon = function (sayi, callback) {
//     const sonuc = sayi + 2;
//     callback(sonuc);
// };
//
// // asenkron çalışan sistemi bir nevi senkrona çevirmiş olduk.
// asenkronFonksiyon(2, function (sonuc) {
//     console.log(sonuc);
//     asenkronFonksiyon(4, function (sonuc) {
//         console.log(sonuc);
//         asenkronFonksiyon(6, function (sonuc) {
//             console.log(sonuc);
//             asenkronFonksiyon(8, function (sonuc) {
//                 console.log(sonuc);
//             })
//         })
//     })
// });
//
// ----------------


// Promise Yapısını kullanarak yapılışı
const asenkronFonksiyon = (sayi) => {
  return new Promise((resolve, reject) => {
      if (sayi === 4)
          resolve("her şey yolunda!");
      else
          reject('bir sorun var abim!');
  })
};

// promise, reject dönünce hiçbir then içerisine girmez, direk catch içine girer
asenkronFonksiyon(4)
    .then((data) => {
        console.log(data);
        return 1;
    })
    .then((data) => {
        console.log(data);
        return 2;
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
        return 4;
    }).then( value => {
    console.log(value,'son then');
    });

