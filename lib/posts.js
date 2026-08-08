import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getPosts() {
  const files = fs.readdirSync(path.join('content/blog'));

  const posts = files
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(
        path.join('content/blog', filename),
        'utf-8'
      );

      const { data: frontmatter } = matter(markdownWithMeta);

      return {
        frontmatter,
        slug: filename.split('.')[0],
      };
    });

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
  });
}

export function getPostBySlug(slug) {
  const markdownWithMeta = fs.readFileSync(
    path.join('content/blog', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    frontmatter,
    content,
  };
}
