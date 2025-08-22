const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');

test('all posts referenced in posts.json exist', async () => {
  const postsDir = path.join(__dirname, '..', 'posts');
  const postsJsonPath = path.join(postsDir, 'posts.json');
  const posts = JSON.parse(await fs.readFile(postsJsonPath, 'utf8'));
  for (const { file } of posts) {
    try {
      await fs.access(path.join(postsDir, file));
    } catch {
      assert.fail(`Missing post file: ${file}`);
    }
  }
});