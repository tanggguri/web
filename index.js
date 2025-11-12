let anw = document.querySelectorAll(".anw");
let menu = 0;
let flag = false;

anw.forEach(function (d, i) {
  d.addEventListener("click", function (e) {
    e.preventDefault();
    if (flag == true && i == menu) {
      close();
      flag = false;
      return;
    }
    close();
    d.nextElementSibling.style.display = "block";
    d.nextElementSibling.nextElementSibling.classList.toggle("ani");
    flag = true;
    menu = i;
  });
});

function close() {
  let anwp = document.querySelectorAll(".wrap section:nth-child(3) p");
  let anwsvg = document.querySelectorAll(".wrap section:nth-child(3) svg");
  anwp.forEach((d) => {
    d.style.display = "none";
  });

  anwsvg.forEach((d) => {
    d.classList.remove("ani");
  });
}
