import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS & method validation
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { rawIdea } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    if (!rawIdea || typeof rawIdea !== 'string') {
      return res.status(400).json({ error: 'Please provide a prompt idea or description.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured in Vercel Environment Variables. Please add GEMINI_API_KEY in Project Settings.',
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `
You are the Chief Prompt Engineer and Master AI Directive Architect of "PROMPTIZ".
Your mission is to construct elite, senior-grade prompt architectures that outperform standard generic prompts.

When crafting prompts, you MUST follow the PROMPTIZ Senior Engineering Architecture:
1. SENIOR ROLE & EXPERT QUALITIES: Open with an authoritative persona declaration ("Imagine you are a world-class, senior principal [Role] and leading authority in [Domain] with 15+ years of mastery...").
2. PRIMARY MISSION & CONTEXT: Define the precise objective, intent, and target outcome.
3. SPECIFICATIONS: Provide exhaustive, granular parameters (optics, sensor, lighting, code architecture, typing constraints, rhetoric, anti-fluff boundaries, etc.).
4. BENCHMARK QUALITIES: Exact high-tier standards and non-negotiable craftsmanship metrics.
5. NEGATIVE BOUNDARIES: Strict constraints on what to strictly exclude or avoid.
6. OUTPUT STRUCTURE: How the AI should format and present its answer.
7. PROFESSIONAL DISCLAIMER: A concise, authoritative disclaimer regarding domain constraints or execution fidelity.
8. FINAL ACTIONABLE INVOCATION: A powerful, unambiguous closing kick (e.g. "Now, generate the [Subject/Deliverable] strictly following all parameters specified above.")

You must respond in valid JSON matching the exact schema requested.
`;

    const promptRequest = `
Generate an elite senior-level prompt for the following request:
- User's Concept / Core Idea: "${rawIdea}"
- Domain/Type: Automatically determine whether this request is for an Image, Code, Writing/Copy, Video, Business/Strategy, or General AI directive based on what the user wants.
- Calibrate the senior role (e.g. Master Cinematographer & Lighting Director for images, Staff Systems Architect for code, Executive Copy Director for writing, Aerial Director of Photography for video, etc.).
- Include realistic technical specifications, benchmark qualities, negative boundaries, a professional disclaimer, and the final actionable invocation.
Ensure the prompt follows the exact PROMPTIZ architecture: "Imagine you are a professional [role]... you are an expert in this... now I want you to create [task]... specifications... qualities... disclaimer... now I want [subject] like this".
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptRequest,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Short title for this engineered prompt' },
            category: { type: Type.STRING, description: 'Category e.g. image, code, writing, business, video, research' },
            rolePersona: { type: Type.STRING, description: 'Senior role title e.g. Principal Cinematographer & Lighting Director' },
            fullPrompt: { type: Type.STRING, description: 'Complete, engineered prompt ready to copy and paste' },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                role: { type: Type.STRING, description: 'The role declaration paragraph' },
                directives: { type: Type.STRING, description: 'The primary directive and context' },
                specifications: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of granular technical/creative specifications',
                },
                qualities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of quality benchmarks',
                },
                negativeConstraints: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'List of negative constraints or things to avoid',
                },
                disclaimer: { type: Type.STRING, description: 'Short professional disclaimer' },
                invocation: { type: Type.STRING, description: 'Final actionable prompt invocation' },
              },
              required: ['role', 'directives', 'specifications', 'qualities', 'disclaimer', 'invocation'],
            },
            recommendedSettings: {
              type: Type.STRING,
              description: 'Recommended model settings (e.g. Aspect ratio, parameters, temperature)',
            },
            variables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  defaultValue: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['name', 'defaultValue'],
              },
            },
            engineeringNotes: {
              type: Type.STRING,
              description: 'Brief 1-2 sentence explanation of why this prompt structure elevates results',
            },
          },
          required: ['title', 'rolePersona', 'fullPrompt', 'breakdown', 'recommendedSettings'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.status(200).json(parsed);
  } catch (err: any) {
    console.error('Error in /api/generate-prompt:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to generate prompt. Please verify server configuration.',
    });
  }
}
