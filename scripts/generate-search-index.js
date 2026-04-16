import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSearchIndex() {
  const contentDir = path.join(__dirname, '..', 'src', 'content', 'posts');
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const searchIndex = [];

  // Read all Markdown content files
  const files = fs.readdirSync(contentDir).filter((file) => /\.(md|mdx)$/.test(file));

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract frontmatter - support both \n and \r\n line endings
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontmatterMatch) {
      console.log(`Skipping ${file}: no frontmatter found`);
      continue;
    }

    const frontmatter = frontmatterMatch[1];
    const body = content.slice(frontmatterMatch[0].length).trim();

    // Parse frontmatter (simple parser)
    const title = frontmatter.match(/title:\s*['"](.+)['"]/)?.[1] || '';
    const description = frontmatter.match(/description:\s*['"](.+)['"]/)?.[1] || '';
    const tagsMatch = frontmatter.match(/tags:\s*\[(.*?)\]/s);
    const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [];
    const category = frontmatter.match(/category:\s*['"](.+)['"]/)?.[1] || '';
    const draftValue = frontmatter.match(/draft:\s*(true|false)/i)?.[1]?.toLowerCase();
    const isDraft = draftValue === 'true';

    if (isDraft) {
      continue;
    }

    // Remove code blocks and markdown syntax for better searching
    const cleanBody = body
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]+`/g, '')
      .replace(/[#*_\[\]()]/g, '')
      .replace(/\n+/g, ' ')
      .trim();

    const slug = file.replace(/\.(md|mdx)$/, '');

    searchIndex.push({
      slug,
      title,
      description,
      category,
      tags,
      content: cleanBody.slice(0, 500) // Limit content length
    });
  }

  // Write search index
  const outputPath = path.join(publicDir, 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✓ Generated search index with ${searchIndex.length} posts`);
}

generateSearchIndex().catch(console.error);
