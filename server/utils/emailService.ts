import crypto from 'crypto';

export const generateVerificationToken = (): string => {
    return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    // In production, integrate with nodemailer, SendGrid, or AWS SES
    // For now, we use console.log as a placeholder
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/verify-email?token=${token}`;
    
    console.log(`
    ============================================
    📧 VERIFICATION EMAIL
    ============================================
    To: ${email}
    Subject: Verify your ToolMate AI account
    
    Click this link to verify your email:
    ${verificationUrl}
    
    This link expires in 24 hours.
    ============================================
    `);

    // TODO: Replace with real email provider
    // Example with nodemailer:
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({
    //     from: '"ToolMate AI" <noreply@toolmate.ai>',
    //     to: email,
    //     subject: 'Verify your ToolMate AI account',
    //     html: `<h1>Welcome to ToolMate AI!</h1><p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    // });
};
