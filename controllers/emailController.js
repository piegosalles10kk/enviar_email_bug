const nodemailer = require('nodemailer');
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS (true para 465, false para 587 com STARTTLS)
    auth: {
        // Use variáveis de ambiente para a conta que realmente fará o login no SMTP
        user: process.env.SMTP_USER, // Ex: 'suaconta@gmail.com'
        pass: process.env.SMTP_PASS, // Senha de aplicativo
    },
});

/**
 * Função para enviar e-mail com dados de remetente (from), destino (to),
 * assunto (subject) e corpo (html) recebidos diretamente do corpo da requisição (req.body).
 * * Espera-se que req.body contenha:
 * @param {string} from - O endereço de e-mail do remetente (pode ser diferente do auth.user, mas o servidor deve permitir).
 * @param {string} to - O endereço de e-mail do destinatário.
 * @param {string} subject - O assunto do e-mail.
 * @param {string} html - O corpo do e-mail (html simples).
 */
exports.sendEmail = async (req, res) => {
    try {
        const { from, to, subject, html } = req.body;
        
        if (!from || !to || !subject || !html) {
            return res.status(400).json({ 
                message: 'Dados insuficientes para envio de e-mail. São necessários "from", "to", "subject" e "html".' 
            });
        }

        const mailOptions = {
            from,    
            to,       
            subject,  
            html,     
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso! Mensagem ID:', info.messageId);
        res.status(200).json({ 
            message: 'E-mail enviado com sucesso!', 
            info: { 
                messageId: info.messageId, 
                accepted: info.accepted 
            } 
        });

    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ 
            message: 'Erro ao enviar e-mail.', 
            error: error.message 
        });
    }
};