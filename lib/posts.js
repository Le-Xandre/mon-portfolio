import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPosts() {
  const blogPath = path.join('content/blog');

  const files = fs
    .readdirSync(blogPath)
    .filter((filename) => filename.endsWith('.md'));

  return files
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join(blogPath, filename),
        'utf-8'
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        frontmatter,
        slug: filename.split('.')[0],
      };
    })
    .sort((a, b) => {
      const numberA = parseInt(a.slug.replace('article', ''), 10);
      const numberB = parseInt(b.slug.replace('article', ''), 10);

      return numberB - numberA;
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
