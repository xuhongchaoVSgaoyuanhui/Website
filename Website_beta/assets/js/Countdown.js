function startCountdown() {
  const countdownElement = document.getElementById("countdown");

  // 固定目标时间（台北时区为例）
  const targetDate = new Date("2025-08-01T00:00:00+08:00"); // 可按需调整时区

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      countdownElement.textContent = "活动已结束";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownElement.textContent = `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

document.addEventListener("DOMContentLoaded", startCountdown);