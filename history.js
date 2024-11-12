document.addEventListener("DOMContentLoaded", loadHistory);

function loadHistory() {
    const historyTableBody = document.querySelector("#history-table tbody");
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];

    quizHistory.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.username}</td>
            <td>${entry.category}</td>
            <td>${entry.score}</td>
            <td>${entry.totalQuestions}</td>
            <td>${entry.quizDate}</td>
        `;

        historyTableBody.appendChild(row);
    });
}

function goHome() {
    window.location.href = 'index.html'; // Adjust path as necessary
}
