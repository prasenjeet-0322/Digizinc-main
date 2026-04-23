const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf-8');

const servicesMatch = content.match(/const services = \[([\s\S]*?)\];/);
const projectsMatch = content.match(/const projects = \[([\s\S]*?)\];/);
const postsMatch = content.match(/const posts = \[([\s\S]*?)\];/);

const extractSlugs = (text) => {
  if (!text) return [];
  const matches = [...text.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
  return matches.map(m => m[1]);
};

const services = extractSlugs(servicesMatch ? servicesMatch[1] : "");
const projects = extractSlugs(projectsMatch ? projectsMatch[1] : "");
const posts = extractSlugs(postsMatch ? postsMatch[1] : "");

console.log(JSON.stringify({ services, projects, posts }, null, 2));
