const adImage = document.getElementById('ad-image');
let selectedItem = document.querySelector('.ad__item.bg-purple-800'); // phần tử mặc định được chọn

document.querySelectorAll('.ad__item').forEach(item => {
    item.addEventListener('click', function () {
        const newSrc = this.getAttribute('data-img');
        adImage.setAttribute('src', newSrc);

        if (selectedItem) {
            selectedItem.classList.remove('bg-purple-800', 'text-white');
            selectedItem.classList.add('bg-gray-400', 'bg-opacity-10');
        }

        this.classList.remove('bg-gray-400', 'bg-opacity-10');
        this.classList.add('bg-purple-800', 'text-white');

        selectedItem = this;
    });
});

document.getElementById("xemThemBtn").addEventListener("click", function () {
        window.location.href = "/feedback"; 
});