document.addEventListener("DOMContentLoaded", function () {
    const modalLinks = document.querySelectorAll('.modal-link');

    modalLinks.forEach(link => {
        link.addEventListener("click", async function (e) {
            e.preventDefault();

            const modalId = link.getAttribute('data-modal-id');
            const setId = link.getAttribute('data-id');
            const folderId = link.getAttribute('data-folder-id'); 
            const modal = document.getElementById(modalId);

            if (!modal) return;

            //delete set
            if (modalId === 'notificationDeleteModal') {
                const form = modal.querySelector('form');
                if (form && setId) {
                    form.setAttribute('action', `/me/stored/sets/${setId}?_method=DELETE`);
                }
                modal.classList.remove('hidden');
            } 
            //delete folder
            else if (modalId === 'folderDeleteModal') {
                const form = modal.querySelector('form');
                if(form && folderId){
                    form.setAttribute('action', `/editFolder/stored/folder/${folderId}?_method=DELETE`);
                }
                modal.classList.remove('hidden');
            }
            else {
                const url = link.getAttribute('href');
                try {
                    const res = await fetch(url);
                    const html = await res.text();
                    document.getElementById('modalContainer').innerHTML = html;

                    const loadedModal = document.getElementById(modalId);
                    if (loadedModal) {
                        loadedModal.classList.remove('hidden');

                        const closeBtns = loadedModal.querySelectorAll('.closeModalBtn');
                        closeBtns.forEach(btn => {
                            btn.addEventListener("click", () => {
                                loadedModal.classList.add('hidden');
                            });
                        });
                    }
                } catch (err) {
                    console.error('Lỗi tải modal:', err);
                }
            }

            const closeBtns = modal.querySelectorAll('.closeModalBtn');
            closeBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    modal.classList.add('hidden');
                });
            });
        });
    });
});
