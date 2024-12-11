const imageUpload = document.getElementById('imageUpload');
const targetImage = document.getElementById('targetImage');

imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            targetImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});
