try {
  let lastName = "Yetayeh";
  let fullName = fistName + " " + lastName;
} catch (err) {
  //console.log(err);
  console.log("hata oluştu");
  console.log("Name of the error :", err.name);
  console.log("Error message :", err.message);
}

console.log("hello");
