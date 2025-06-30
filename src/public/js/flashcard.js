document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".flip-card");
  const wrappers = document.querySelectorAll(".flashcard");
  let currentIndex = 0;

  // Lật thẻ khi click
  cards.forEach(card => {
    card.addEventListener("click", function () {
      card.classList.toggle("flipped");
    });
  });

  function showCard(index) {
    wrappers.forEach((wrapper, i) => {
      if (i === index) {
        wrapper.classList.remove("flashcard-hidden");
        wrapper.classList.add("flashcard-visible");
      } else {
        wrapper.classList.remove("flashcard-visible");
        wrapper.classList.add("flashcard-hidden");
      }
    });
  }

  // Nút trái
  document.querySelector(".fa-arrow-left").closest("button").addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + wrappers.length) % wrappers.length;
    showCard(currentIndex);
  });

  // Nút phải
  document.querySelector(".fa-arrow-right").closest("button").addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % wrappers.length;
    showCard(currentIndex);
  });
});

//edit
document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById('editBtn');
  const content = document.getElementById('editContent');

  editBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    content.classList.toggle('hidden');
  });

  document.addEventListener("click", function (e) {
    if (!editBtn.contains(e.target) && !content.contains(e.target)) {
      content.classList.add('hidden');
    }
  });
});

function playAudio(event, url) {
  event.stopPropagation();
  const audio = new Audio(url);
  audio.play();
}

