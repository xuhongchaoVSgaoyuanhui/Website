import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import open from 'open';
import path from 'path';
import { fileURLToPath } from 'url';

// 环境配置
dotenv.config({ path: './private/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Resend 初始化
const resend = new Resend(process.env.RESEND_API_KEY);

// 中间件
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'Public'))); // 👈 用绝对路径托管 Public 文件夹

// 邮件发送 API
app.post('/send', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).send('❌ 缺少 email 参数');

    try {
        const { data, error } = await resend.emails.send({
            from: 'HammeringSteel工作室 <PLAYGAME@hammeringsteelstudio.com>',
            to: email,
            subject: '欢迎加入 HammeringSteel！',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2>欢迎来到 HammeringSteel 工作室！</h2>
          <p>我们很高兴你加入我们的游戏社区。</p>
          <p>有任何建议或问题，欢迎随时联系我们！</p>
          <p>合作伙伴：</p>
          <img src="https://yourdomain.com/logo/logo1.png" width="80">
          <img src="https://yourdomain.com/logo/logo2.png" width="80" alt="">
          <p style="margin-top: 24px;">- HammeringSteel 团队</p>
        </div>
      `
        });

        if (error) {
            console.error('❌ 邮件发送失败:', error);
            return res.status(500).json({ error });
        }

        console.log('✅ 邮件发送成功:', data);
        res.json({ success: true, data });

    } catch (err) {
        console.error('❌ 程序异常:', err);
        res.status(500).json({ error: err.message });
    }
});

// 启动服务并自动打开页面
app.listen(port, () => {
    console.log(`✅ 自动邮件服务已启动：http://localhost:${port}`);
    open(`http://localhost:${port}/test.world.html`);
});