document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("请完整填写所有字段！");
      return;
    }

    try {
      const response = await fetch('/Private/sendmail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (response.ok) {
        alert("邮件发送成功！");
        form.reset();
      } else {
        alert("发送失败：" + result.error || "未知错误");
      }
    } catch (error) {
      alert("网络错误或服务器未响应！");
    }
  });
});