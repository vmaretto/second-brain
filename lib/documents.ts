import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Document {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  modified: string;
}

const documentsDirectory = path.join(process.cwd(), 'documents');

export function getCategories(): string[] {
  if (!fs.existsSync(documentsDirectory)) {
    return [];
  }
  return fs.readdirSync(documentsDirectory).filter((file) => {
    const fullPath = path.join(documentsDirectory, file);
    return fs.statSync(fullPath).isDirectory();
  });
}

export function getDocuments(): Document[] {
  const categories = getCategories();
  const documents: Document[] = [];

  for (const category of categories) {
    const categoryPath = path.join(documentsDirectory, category);
    const files = fs.readdirSync(categoryPath).filter((f) => f.endsWith('.md'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const stats = fs.statSync(filePath);

      documents.push({
        slug: `${category}/${file.replace(/\.md$/, '')}`,
        title: data.title || file.replace(/\.md$/, ''),
        content,
        category,
        tags: data.tags || [],
        date: data.date || stats.birthtime.toISOString().split('T')[0],
        modified: stats.mtime.toISOString().split('T')[0],
      });
    }
  }

  // Sort by date descending
  return documents.sort((a, b) => b.date.localeCompare(a.date));
}

export function getDocumentBySlug(slug: string): Document | null {
  const [category, name] = slug.split('/');
  const filePath = path.join(documentsDirectory, category, `${name}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const stats = fs.statSync(filePath);

  return {
    slug,
    title: data.title || name,
    content,
    category,
    tags: data.tags || [],
    date: data.date || stats.birthtime.toISOString().split('T')[0],
    modified: stats.mtime.toISOString().split('T')[0],
  };
}

export function searchDocuments(query: string): Document[] {
  const documents = getDocuments();
  const lowerQuery = query.toLowerCase();

  return documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(lowerQuery) ||
      doc.content.toLowerCase().includes(lowerQuery) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
