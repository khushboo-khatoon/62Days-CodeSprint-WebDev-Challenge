/**
 * Build script for Valentine's Day app
 * Injects Supabase environment variables into HTML files
 */

const fs = require('fs');
const path = require('path');

// Files to process (replace placeholders with env vars)
// admin.html is protected by Supabase Auth - only authenticated users can access
const filesToProcess = ['index.html', 'main.html', 'admin.html', 'env.js'];

// Environment variables (from Vercel or .env)
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '__SUPABASE_URL__';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__';

console.log('🔧 Building Valentine\'s Day app...');
console.log(`   SUPABASE_URL: ${SUPABASE_URL.substring(0, 30)}...`);

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Process each file
filesToProcess.forEach(filename => {
  const srcPath = path.join(__dirname, filename);
  const destPath = path.join(distDir, filename);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`   ⚠️  Skipping ${filename} (not found)`);
    return;
  }
  
  let content = fs.readFileSync(srcPath, 'utf8');
  
  // Replace placeholders
  content = content.replace(/__SUPABASE_URL__/g, SUPABASE_URL);
  content = content.replace(/__SUPABASE_ANON_KEY__/g, SUPABASE_ANON_KEY);
  
  fs.writeFileSync(destPath, content);
  console.log(`   ✅ Processed ${filename}`);
});

// Copy other static files (no processing needed)
const staticFiles = ['style.css', 'main.css', 'script.js', 'main.js', 'config-loader.js'];
staticFiles.forEach(filename => {
  const srcPath = path.join(__dirname, filename);
  const destPath = path.join(distDir, filename);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`   ✅ Copied ${filename}`);
  }
});

// Copy imgs directory
const imgsSrcDir = path.join(__dirname, 'imgs');
const imgsDestDir = path.join(distDir, 'imgs');

if (fs.existsSync(imgsSrcDir)) {
  if (!fs.existsSync(imgsDestDir)) {
    fs.mkdirSync(imgsDestDir, { recursive: true });
  }
  
  fs.readdirSync(imgsSrcDir).forEach(file => {
    fs.copyFileSync(
      path.join(imgsSrcDir, file),
      path.join(imgsDestDir, file)
    );
  });
  console.log(`   ✅ Copied imgs directory`);
}

console.log('\n🎉 Build complete! Output in ./dist');
