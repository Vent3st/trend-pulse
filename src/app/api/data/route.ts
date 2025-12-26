import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

const VALID_FILTERS = ['7d', '30d', '90d'] as const;
type ValidFilter = typeof VALID_FILTERS[number];

const FILE_MAP: Record<ValidFilter, string> = {
  '7d': 'repos_last_7_days.json',
  '30d': 'repos_last_30_days.json',
  '90d': 'repos_last_3_months.json',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get('filter') as ValidFilter | null;

  // Strict validation - only allow known filters
  const validFilter: ValidFilter = filter && VALID_FILTERS.includes(filter) ? filter : '30d';
  const fileName = FILE_MAP[validFilter];

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
