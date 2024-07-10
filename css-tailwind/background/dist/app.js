/* Dark & Light Mode */
const htmlTag = document.getElementsByTagName("html")[0];

window.onload = function () {
  if (localStorage.theme === "dark") {
    htmlTag.classList.add("dark");
  }
};

try {
  function changeTheme(e) {
    e.preventDefault();

    if (htmlTag.className.includes("dark")) {
      // htmlTag.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      // htmlTag.classList.add("dark");
      localStorage.theme = "dark";
    }

    htmlTag.classList.toggle("dark");
  }

  const switcher = document.getElementById("theme-mode");
  switcher?.addEventListener("click", changeTheme);
  
} catch (err) {
   console.log(err)
}
