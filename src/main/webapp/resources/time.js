document.addEventListener("DOMContentLoaded", timer);

function timer() {
    let timeP = document.getElementById('interactive_time');
    timeP.innerHTML = new Date().toLocaleTimeString();
    setInterval(() => {
        // ваш код для обновления времени каждые 9 секунд
        timeP.innerText = new Date().toLocaleTimeString();
    }, 9000);
}
