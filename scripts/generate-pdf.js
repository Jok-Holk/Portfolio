import { mdToPdf } from 'md-to-pdf';
import chromium from '@sparticuz/chromium';
import fs from 'fs/promises';

const puppeteerConfig = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: chromium.executablePath(),
    headless: chromium.headless,
    ignoreDefaultArgs: ['--disable-extensions'],
};

async function generatePDF(mdFile, pdfFile, cssFile) {
    try {
        const mdContent = await fs.readFile(mdFile, 'utf-8');
        const cssContent = await fs.readFile(cssFile, 'utf-8');

        await mdToPdf({
            content: mdContent,
            path: pdfFile,
            stylesheet: [cssContent],
            puppeteer: puppeteerConfig,
            pdfOptions: { timeout: 60000, format: 'A4' },
        });
        console.log(`✅ Generated: ${pdfFile}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        throw error;
    }
}

// Run
(async () => {
    await generatePDF('public/resumes/vi/resume-vi.md', 'public/resumes/vi/resume-vi.pdf', 'public/resumes/styles.css');
    await generatePDF('public/resumes/en/resume-en.md', 'public/resumes/en/resume-en.pdf', 'public/resumes/styles.css');
    console.log('🎉 PDFs done!');
})();
