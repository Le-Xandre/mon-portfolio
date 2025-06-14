document.addEventListener("DOMContentLoaded", function () {
    var lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    document.body.appendChild(lightbox);

    var images = document.querySelectorAll(".gallery img"); // Ajuste ce sélecteur si besoin
    images.forEach(function (img) {
        img.addEventListener("click", function () {
            var imgClone = img.cloneNode();
            lightbox.innerHTML = "";
            lightbox.appendChild(imgClone);
            lightbox.style.display = "flex";
        });
    });

    lightbox.addEventListener("click", function () {
        lightbox.style.display = "none";
    });
});
