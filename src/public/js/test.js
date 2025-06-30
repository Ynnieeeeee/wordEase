document.addEventListener("DOMContentLoaded", () => {
    const completeBtn = document.getElementById("completeTest");
    const resultScreen = document.getElementById("resultScreen");
    const correctSpan = document.getElementById("correctCount");
    const wrongSpan = document.getElementById("wrongCount");

    let correctCount = 0;
    let wrongCount = 0;

    function markAnswered(container) {
        container.classList.add("answered");
    }

    function isAlreadyAnswered(container) {
        return container.classList.contains("answered");
    }

    function showResult(container, isCorrect) {
        const result = container.querySelector(".result");
        if (!result) return;
        result.textContent = isCorrect ? "✅ Chính xác!" : "❌ Sai rồi!";
        result.classList.add(isCorrect ? "text-green-600" : "text-red-600");

        if (isCorrect) correctCount++;
        else wrongCount++;

        markAnswered(container);
    }

    // fill
    document.querySelectorAll(".answer-input").forEach(input => {
        input.addEventListener("blur", () => {
            const container = input.closest(".exercise");
            if (isAlreadyAnswered(container)) return;

            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = input.dataset.answer.trim().toLowerCase();

            showResult(container, userAnswer === correctAnswer);
        });
    });

    // truefalse
    document.querySelectorAll(".tf-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            if (isAlreadyAnswered(container)) return;

            const isCorrect = btn.dataset.ans === "true";
            showResult(container, isCorrect);
        });
    });

    // multiplechoice
    document.querySelectorAll(".mc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            if (isAlreadyAnswered(container)) return;

            const correct = container.getAttribute("data-answer");
            const chosen = btn.dataset.ans;

            showResult(container, chosen === correct);
        });
    });

    // audiochoice
    document.querySelectorAll(".audio-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const container = btn.closest(".exercise");
            if (isAlreadyAnswered(container)) return;

            const correct = container.getAttribute("data-answer");
            const chosen = btn.dataset.ans;

            showResult(container, chosen === correct);
        });
    });

    // Hoàn thành
    completeBtn?.addEventListener("click", () => {
        correctSpan.textContent = correctCount;
        wrongSpan.textContent = wrongCount;
        resultScreen.classList.remove("hidden");
        resultScreen.classList.add("flex");
    });
});
