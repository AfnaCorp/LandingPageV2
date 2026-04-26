import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

const legalNoticeFilePath = path.join(process.cwd(), 'legal', 'mentionslegales.md');

export async function GET() {
  try {
    const content = await readFile(legalNoticeFilePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Failed to read legal/mentionslegales.md:', error);
    return NextResponse.json(
      {
        error: 'Impossible de charger les mentions légales.',
      },
      { status: 500 }
    );
  }
}
