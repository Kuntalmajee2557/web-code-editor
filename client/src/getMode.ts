export function getMode(file: string) {
    const filetype = `.${file.toLocaleLowerCase().split('.').pop()}` as keyof typeof modeMap;
    const modeMap = {
        // Programming Languages
        '.js': 'javascript',
        '.jsx': 'jsx',
        '.ts': 'typescript',
        '.tsx': 'tsx',
        '.py': 'python',
        '.java': 'java',
        '.cpp': 'c_cpp',
        '.c': 'c_cpp',
        '.cs': 'csharp',
        '.php': 'php',
        '.rb': 'ruby',
        '.go': 'golang',
        '.rs': 'rust',
        '.swift': 'swift',
        '.kt': 'kotlin',
        '.dart': 'dart',

        // Web Technologies
        '.html': 'html',
        '.htm': 'html',
        '.css': 'css',
        '.scss': 'scss',
        '.sass': 'sass',
        '.less': 'less',
        '.json': 'json',
        '.xml': 'xml',
        '.yml': 'yaml',
        '.yaml': 'yaml',

        // Scripting and Configuration
        '.sh': 'sh',
        '.bash': 'sh',
        '.zsh': 'sh',
        '.sql': 'sql',
        '.dockerfile': 'dockerfile',
        '.toml': 'toml',
        '.ini': 'ini',
        '.conf': 'ini',

        // Markup and Documentation
        '.md': 'markdown',
        '.markdown': 'markdown',
        '.tex': 'tex',
        '.latex': 'latex',

        // Other common file types
        '.svg': 'svg',
        '.vue': 'vue',
        '.log': 'text'
    }
    return modeMap[filetype] || 'text';
}