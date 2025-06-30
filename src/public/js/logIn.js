document.getElementById('closeLogInBtn').addEventListener("click", () => {
    document.getElementById('form-2').classList.add('hidden');
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('notificationModal');
    const modalMessage = document.getElementById('modalMessage');

    if (window.SHOW_NOTIFICATION_MAIL && modal) {
        modal.classList.remove('hidden');
        if (modalMessage) modalMessage.textContent = 'Email không tồn tại';
    }

    if (window.SHOW_NOTIFICATION_PASSWORD && modal) {
        modal.classList.remove('hidden');
        if (modalMessage) modalMessage.textContent = 'Mật khẩu không đúng';
    }

    const closeBtns = document.querySelectorAll('.closeModalBtn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.fixed');
            if (modal) modal.classList.add('hidden');
        });
    });
});
