import { GoogleGenAI } from "@google/genai";
import { sanitizeJSON } from "./parseJson";


const ai = new GoogleGenAI({
  apiKey: "AIzaSyAWcD2rv0lZW0qMh2cr8QKIlMwO_A3Gen8"
});

export function extractRawJson(input: string): any {
  const match = input.match(/```json\s*([\s\S]*?)\s*```/i);
  if (!match) return null;

  let raw = match[1];

  const fixCommonJsonIssues = (jsonStr: string): string => {
    return jsonStr
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\\([^"\\/bfnrt]|$)/g, '\\\\$1')
      .replace(/,(\s*[}\]])/g, '$1')
      .replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":')
      .replace(/'([^']*)'/g, '"$1"')
      .replace(/\\'/g, "'")
      .replace(/"\s*"/g, '", "')
      .replace(/\n\s*/g, ' ')
      .replace(/\t/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const cleaned = fixCommonJsonIssues(raw);
  const trimmed = cleaned.trim();


  try {
    return JSON.parse(trimmed);
  } catch (e) {
    console.error("Failed to parse JSON after sanitizing:", e, "\nCleaned JSON:", trimmed);
    return null;
  }
}


async function main(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text
}

export default async function analysisCode(code: string) {
const aiPrompt = `You're a professional enterprise-level software engineer.

You will receive code and must analyze it to generate a strict JSON response.

Your response must contain exactly one valid JSON object, no explanations, no markdown.

Structure the output like this:

{
  "key_improvements": [
    "Describe key improvements that should be made."
  ],
  "Mistakes": [
    {
      "code_snippet": "Write the problematic code line",
      "explanation": "Explain why it's wrong and what to fix."
    }
  ],
  "things_to_learn": [
    "List technical concepts or skills the developer should focus on."
  ],
  "code_rating": 4,
  "enhance_suggestion": [
    "Tips to improve code quality, practices, habits."
  ],
  "enhance_code: "Refactored industry-level version of the provided code (escaped properly for JSON)."
}

Rules:
- Do NOT wrap the JSON in \`\`\`json or markdown.
- Ensure all strings use standard double quotes.
- Escape special characters properly.
- Do NOT include text before or after the JSON object.
- Do NOT leave any field undefined.
- 

Now analyze this code:
--- BEGIN CODE ---
${code}
--- END CODE ---
`;


  const response = await main(aiPrompt)
  const final_data = sanitizeJSON(response as string)
  return final_data as any;
  // return final_data as any
}