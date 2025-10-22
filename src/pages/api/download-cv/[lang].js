import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET({ params }) {
    try {
        const filePath = join(process.cwd(), 'public', 'resumes', params.lang, `resume-${params.lang}.pdf`);
        const fileBuffer = readFileSync(filePath);
        return new Response(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="resume.pdf"',
            },
        });
    } catch (error) {
        return new Response('PDF not found', { status: 404 });
    }
}
