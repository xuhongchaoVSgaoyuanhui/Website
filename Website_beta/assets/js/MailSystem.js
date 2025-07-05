import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Resend } from "resend";

dotenv.config({ path: './private/.env' });

const app = express();
const port = 3000;

// 跨域支持（方便前端 fetch 调用）
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-subscribe-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "缺少邮箱地址" });
  }

  try {
    const response = await resend.emails.send({
      from: "PLAYGAME@hammeringsteelstudio.com",
      to: email,
      subject: "🎮 欢迎参加第二季独立游戏比赛！",
      html: `
        <h2>欢迎加入 HammeringSteel Studio 🎮</h2>
        <p>感谢你的订阅！我们会第一时间通知你活动动态与更新。</p>
        <p>活动时间：即日起 - 2025年8月1日</p>
        <p>祝你创作顺利！💥</p>
      `,
    });

    res.json({ success: true, id: response.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`📬 邮件服务已启动：http://localhost:${port}`);
});