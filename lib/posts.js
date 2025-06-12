import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPosts() {
  const files = fs.readdirSync(path.join('content/blog'));

  return files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('content/blog', filename), 'utf-8');
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      frontmatter,
      slug: filename.split('.')[0],
    };
  });
}

export function getPostBySlug(slug) {
  const markdownWithMeta = fs.readFileSync(path.join('content/blog', slug + '.md'), 'utf-8');
  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    frontmatter,
    content,
  };
}
