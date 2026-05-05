const fs = require('fs');
const path = require('path');

const filesToRefactor = [
  'src/pages/dashboard/Dashboard.jsx',
  'src/pages/dashboard/AddProperty.jsx',
  'src/pages/dashboard/EditProperty.jsx',
  'src/pages/Chats.jsx',
  'src/pages/Login.jsx',
  'src/pages/Signup.jsx',
  'src/pages/Explore.jsx',
  'src/pages/PropertyDetails.jsx',
  'src/components/AIChatbot.jsx',
  'src/components/Recommendations.jsx',
  'src/components/property/SearchFilters.jsx',
  'src/components/ui/LocationSelector.jsx'
];

function refactorFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Backgrounds
  content = content.replace(/bg-\[\#030712\]/g, 'bg-gray-50 dark:bg-[#030712]');
  content = content.replace(/bg-\[\#030712\]\/80/g, 'bg-white/80 dark:bg-[#030712]/80');
  content = content.replace(/bg-\[\#030712\]\/90/g, 'bg-white/90 dark:bg-[#030712]/90');
  content = content.replace(/bg-\[\#030712\]\/95/g, 'bg-white/95 dark:bg-[#030712]/95');
  
  // Text
  // Negative lookbehinds for colored backgrounds to avoid breaking buttons
  content = content.replace(/(?<!bg-indigo-\d+\s*)(?<!bg-rose-\d+\s*)(?<!bg-emerald-\d+\s*)(?<!bg-gradient-[^\s]*\s*)(?<!bg-red-\d+\s*)text-white/g, 'text-slate-900 dark:text-white');
  
  content = content.replace(/text-slate-400/g, 'text-slate-600 dark:text-slate-400');
  content = content.replace(/text-slate-300/g, 'text-slate-700 dark:text-slate-300');
  content = content.replace(/text-slate-500/g, 'text-slate-600 dark:text-slate-500');
  
  // Containers
  content = content.replace(/bg-white\/5(?!0)/g, 'bg-white dark:bg-white/5');
  content = content.replace(/bg-white\/10/g, 'bg-slate-100 dark:bg-white/10');
  
  // Borders
  content = content.replace(/border-white\/10/g, 'border-slate-200 dark:border-white/10');
  content = content.replace(/border-white\/20/g, 'border-slate-300 dark:border-white/20');

  // Fix buttons that might have been accidentally changed:
  content = content.replace(/bg-indigo-600(.*?)text-slate-900 dark:text-white/g, 'bg-indigo-600$1text-white');
  content = content.replace(/bg-rose-600(.*?)text-slate-900 dark:text-white/g, 'bg-rose-600$1text-white');
  content = content.replace(/bg-emerald-600(.*?)text-slate-900 dark:text-white/g, 'bg-emerald-600$1text-white');
  content = content.replace(/bg-red-500(.*?)text-slate-900 dark:text-white/g, 'bg-red-500$1text-white');

  fs.writeFileSync(fullPath, content);
  console.log('Refactored', filePath);
}

filesToRefactor.forEach(refactorFile);
