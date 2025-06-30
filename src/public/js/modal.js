document.addEventListener("DOMContentLoaded", function () {
    const modalLinks = document.querySelectorAll('.modal-link');

    modalLinks.forEach(link => {
        link.addEventListener("click", async function (e) {
            e.preventDefault();

            const url = link.getAttribute('href');
            const modalId = link.getAttribute('data-modal-id');

            try {
                const res = await fetch(url);
                const html = await res.text();
                document.getElementById('modalContainer').innerHTML = html;

                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.remove('hidden');
                }

                const closeBtns = modal.querySelectorAll('.closeModalBtn');
                closeBtns.forEach(btn => {
                    btn.addEventListener("click", () => {
                        modal.classList.add('hidden');
                    });
                });

            } catch (err) {
                console.error('Lỗi tải modal:', err);
            }
        });
    });
});
