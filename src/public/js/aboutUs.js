function toggleAccordion(index) {
    const content = document.getElementById('content-' + index);
    const icon = document.getElementById('icon-' + index);
    const isVisible = !content.classList.contains('hidden');

    // Ẩn tất cả trước
    for (let i = 0; i < 5; i++) {
      document.getElementById('content-' + i).classList.add('hidden');
      document.getElementById('icon-' + i).innerText = '+';
    }

    // Hiện nếu chưa hiện
    if (!isVisible) {
      content.classList.remove('hidden');
      icon.innerText = '−';
    }
}