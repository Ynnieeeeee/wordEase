document.querySelectorAll('.fileInput').forEach((input) => {
    const image = input.previousElementSibling;

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            image.src = URL.createObjectURL(file);
        }
    });
});

var cardIndex = 2;

document.getElementById('addCardBtn').addEventListener('click', () => {
    const container = document.getElementById('cardsContainer');

    const cardWrapper = document.createElement('div');
    cardWrapper.className = "flex justify-between items-center p-3 relative mt-8 cardWrapper";
    cardWrapper.innerHTML = `
        <span class="font-medium">${cardIndex}</span>
        <span class="absolute w-full h-[2px] bg-[#e6e9eb] top-[40px] right-0"></span>
        <i class="fa-solid fa-trash-can cursor-pointer" onclick="removeCard(this)"></i>
    `;

    const card = document.createElement('div');
    card.className = "flex flex-col md:flex-row justify-between gap-4 mt-6";

    card.innerHTML = `
        <div class="relative w-full md:w-[45%]">
            <input type="text" name="word[]" class="w-full h-[35px] outline-none">
            <span class="absolute w-full h-[3px] bg-black top-[33px] left-0"></span>
            <div class="py-4"><span class="text-[#a2a3a6]">Thuật ngữ</span></div>
        </div>
        <div class="relative w-full md:w-[45%]">
            <input type="text" name="meaning[]" class="w-full h-[35px] outline-none">
            <span class="absolute w-full h-[3px] bg-black top-[33px] left-0"></span>
            <div class="py-4"><span class="text-[#a2a3a6]">Định nghĩa</span></div>
        </div>
        <div class="flex justify-center items-start">
            <label class="cursor-pointer">
                <img src="/img/createrSets_img.png" alt="example" class="w-[60px] imagePreview">
                <input type="file" accept="image/*" name="img[]" class="hidden fileInput">
            </label>
        </div>
    `;

    // thêm 1 phần tử vào
    container.appendChild(cardWrapper);
    container.appendChild(card);

    cardIndex++;
});

function removeCard(icon) {
    const wrapper = icon.closest('.cardWrapper');
    const card = wrapper.nextElementSibling;

    // Xóa cả wrapper và card
    wrapper.remove();
    if (card) card.remove();

    // Cập nhật lại số thứ tự
    const wrappers = document.querySelectorAll('.cardWrapper');
    wrappers.forEach((el, index) => {
        el.querySelector('span.font-medium').textContent = index + 1;
    });

    cardIndex = wrappers.length + 1;
}


