const nodemailer = require('nodemailer');

// Configurar transporte Nodemailer para Gmail
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'chamadoschromatox@gmail.com', 
        pass: 'glsdpiqtmubibzzf', 
    },
});

// Função para enviar e-mail
exports.sendEmail = async (req, res) => {
    try {
        // Desestruturação com verificação
        const { to, requerente, titulo, tipo, categoria, chamado } = req.body;
        if (!to || !requerente || !titulo || !tipo || !categoria || !chamado) {
            return res.status(400).json({ message: 'Dados insuficientes para envio de e-mail.' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: `${requerente} | CHROMATOX | ${titulo}`,
            text: `Tipo de ocorrência: ${tipo}\n\nCategoria: ${categoria}\n\nResumo do chamado: ${chamado}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso!', info);
        res.status(200).json({ message: 'E-mail enviado com sucesso!', info });
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        res.status(500).json({ message: 'Erro ao enviar e-mail.', error });
    }
};
