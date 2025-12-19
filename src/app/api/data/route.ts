import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter');

  let fileName = '';
  switch (filter) {
    case '7d': fileName = 'repos_last_7_days.json'; break;
    case '30d': fileName = 'repos_last_30_days.json'; break;
    case '90d': fileName = 'repos_last_3_months.json'; break;
    default: fileName = 'repos_last_30_days.json';
  }

  const filePath = path.join(process.cwd(), 'src', 'data', fileName);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Data is already sorted by true followers from parse_deep.py
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return NextResponse.json({ error: 'Data not found' }, { status: 404 });
  }
}
