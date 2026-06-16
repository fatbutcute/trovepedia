import fs from 'fs';
import path from 'path';
const ignoredFolders = ['node_modules', '.git', '.next', '.pnpm'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        
        if (fs.statSync(fullPath).isDirectory()) {
            if (!ignoredFolders.includes(file)) {
                arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            }
        } else {
            // Si c'est un fichier, on l'ajoute
            const stats = fs.statSync(fullPath);
            arrayOfFiles.push({ path: fullPath, size: stats.size });
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles('.', []);
files.sort((a, b) => b.size - a.size);

console.log("Top 10 des fichiers les plus lourds (hors dossiers exclus)");
files.slice(0, 10).forEach((file, index) => {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    console.log(`${index + 1}. ${sizeInMb} Mo - ${file.path}`);
});