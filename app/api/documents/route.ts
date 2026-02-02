import { NextResponse } from 'next/server';
import { getDocuments, searchDocuments } from '@/lib/documents';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  try {
    const documents = query ? searchDocuments(query) : getDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}
