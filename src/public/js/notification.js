document.addEventListener('DOMContentLoaded', function () {
    if (window.SHOW_NOTIFICATION) {
        const modal = document.getElementById('notificationModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    // Đóng modal khi nhấn nút Cancel
    const closeBtns = document.querySelectorAll('.closeModalBtn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.fixed');
            if (modal) modal.classList.add('hidden');
        });
    });
});