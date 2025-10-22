const { Puppeteer } = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const mdToPdf = require('md-to-pdf');

const executablePath = chromium.executablePath();

async function generatePDF(mdPath, pdfPath, cssPath) {
    await mdToPdf({
        content: mdPath,
        path: pdfPath,
        stylesheet: [cssPath],
        puppeteer: {
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath,
            headless: chromium.headless,
        },
        pdf: { timeout: 60000 },
    });
    console.log(`Generated: ${pdfPath}`);
}

generatePDF('public/resumes/vi/resume-vi.md', 'public/resumes/vi/resume-vi.pdf', 'public/resumes/styles.css')
    .then(() =>
        generatePDF('public/resumes/en/resume-en.md', 'public/resumes/en/resume-en.pdf', 'public/resumes/styles.css'),
    )
    .catch(console.error);
