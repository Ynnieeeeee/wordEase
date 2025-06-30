const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const sideNav = document.getElementById('sideNav');

menuToggle.addEventListener('click', () => {
    sideNav.classList.remove('translate-x-full');
    sideNav.classList.add('translate-x-0');
});

menuClose.addEventListener('click', () => {
    sideNav.classList.remove('translate-x-0');
    sideNav.classList.add('translate-x-full');
});

const mobileSearchBtn = document.getElementById('mobileSearchBtn');
const mobileSearchModal = document.getElementById('mobileSearchModal');

// Mở modal khi nhấn icon search mobile
mobileSearchBtn?.addEventListener('click', () => {
    mobileSearchModal.classList.remove('hidden');
    mobileSearchModal.querySelector('input')?.focus();
});

// Click ra ngoài để đóng
mobileSearchModal?.addEventListener('click', (e) => {
    if (e.target === mobileSearchModal) {
        mobileSearchModal.classList.add('hidden');
    }
});