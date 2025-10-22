import { mdToPdf } from 'md-to-pdf';
import chromium from '@sparticuz/chromium';
import fs from 'fs/promises';
import path from 'path';

const executablePath = chromium.executablePath();

async function generatePDF(mdFile, pdfFile, cssFile) {
    try {
        // Đọc MD content để tránh path issue trên Vercel
        const mdContent = await fs.readFile(mdFile, 'utf-8');
        const cssContent = await fs.readFile(cssFile, 'utf-8');

        await mdToPdf({
            content: mdContent,
            path: pdfFile,
            stylesheet: [cssContent], // Inline CSS để nhanh
            puppeteer: {
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath,
                headless: chromium.headless,
            },
            pdfOptions: { timeout: 60000 }, // 60s timeout cho Vercel
        });
        console.log(`✅ Generated: ${pdfFile}`);
    } catch (error) {
        console.error(`❌ Error generating ${pdfFile}:`, error.message);
        throw error; // Để build fail nếu cần, hoặc return để skip
    }
}

// Chạy async cho vi rồi en
(async () => {
    await generatePDF('public/resumes/vi/resume-vi.md', 'public/resumes/vi/resume-vi.pdf', 'public/resumes/styles.css');
    await generatePDF('public/resumes/en/resume-en.md', 'public/resumes/en/resume-en.pdf', 'public/resumes/styles.css');
    console.log('🎉 All PDFs generated!');
})();
