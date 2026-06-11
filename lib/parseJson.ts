export function sanitizeJSON(input: string): any {
  if (!input || typeof input !== 'string') {
    return null;
  }

  let cleaned = input.trim();
  
  if (cleaned === '') {
    return null;
  }

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    cleaned = cleanJSONString(cleaned);
    try {
      return JSON.parse(cleaned);
    } catch (finalError) {
      return null;
    }
  }
}

function cleanJSONString(str: string): string {
  str = str.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  
  str = str.replace(/,(\s*[}\]])/g, '$1');
  
  str = str.replace(/([}\]])(\s*)([{\[])/g, '$1,$2$3');
  
  str = str.replace(/([^\\])\\([^"\\\/bfnrtu])/g, '$1\\\\$2');
  
  str = str.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  
  str = str.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');
  
  str = str.replace(/:\s*'([^']*)'/g, ': "$1"');
  
  str = str.replace(/([^\\])"/g, '$1\\"');
  str = str.replace(/^"/g, '\\"');
  
  str = str.replace(/\\"/g, '"');
  
  let braceCount = 0;
  let inString = false;
  let result = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const prevChar = i > 0 ? str[i - 1] : '';
    
    if (char === '"' && prevChar !== '\\') {
      inString = !inString;
    }
    
    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
    
    result += char;
    
    if (!inString && braceCount === 0 && char === '}') {
      break;
    }
  }
  
  return result;
}