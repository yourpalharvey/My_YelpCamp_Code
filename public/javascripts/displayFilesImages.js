function previewMultiple(event) {
    var images = document.getElementById("image");
    var number = images.files.length;
    for (i = 0; i < number; i++) {
        var urls = URL.createObjectURL(event.target.files[i]);
        var img = document.createElement("img");
        img.setAttribute("src", urls);
        img.setAttribute('id', 'formFile'); //for css
        img.setAttribute('class', ' col-6 col-lg-4 col-xl-3');
        document.getElementById('imageBox').appendChild(img);
    }
}