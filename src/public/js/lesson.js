document.addEventListener("DOMContentLoaded", () => {
    const exercises = document.querySelectorAll(".exercise");
    let current = 0;

    function showNext() {
        if (current < exercises.length - 1) {
            exercises[current].classList.add("hidden");
            current++;
            exercises[current].classList.remove("hidden");
        } else {
            exercises[current].classList.add("hidden");
            const congrats = document.getElementById("congratsScreen");
            congrats.classList.remove("hidden");
            congrats.classList.add("flex");
        }
    }

    // Điền nghĩa
    document.querySelectorAll(".check-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            const input = container.querySelector(".answer-input");
            const result = container.querySelector(".result");

            const correct = input.dataset.answer.trim().toLowerCase();
            const user = input.value.trim().toLowerCase();

            result.textContent = user === correct ? "✅ Chính xác!" : `❌ Sai rồi! Đáp án: ${correct}`;
            result.classList.add(user === correct ? "text-green-600" : "text-red-600");

            setTimeout(showNext, 2000);
        });
    });

    // Đúng/Sai
    document.querySelectorAll(".tf-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            const result = container.querySelector(".result");
            const isCorrect = btn.dataset.ans === "true";

            result.textContent = isCorrect ? "✅ Chính xác!" : "❌ Sai rồi!";
            result.classList.add(isCorrect ? "text-green-600" : "text-red-600");

            setTimeout(showNext, 2000);
        });
    });

    // Trắc nghiệm 4 đáp án
    document.querySelectorAll(".mc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            const result = container.querySelector(".result");
            const correct = container.dataset.answer;
            if (btn.dataset.ans === correct) {
                result.textContent = "✅ Chính xác!";
                result.classList.add("text-green-600");
            } else {
                result.textContent = `❌ Sai rồi! Đáp án đúng: ${correct}`;
                result.classList.add("text-red-600");
            }

            setTimeout(() => {
                result.classList.remove("text-green-600", "text-red-600");
                showNext();
            }, 2000);
        });
    });
});
