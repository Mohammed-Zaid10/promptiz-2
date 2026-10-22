import express from 'express';
import type { Request, Response } from 'express';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use('/api', express.json({ limit: '10mb' }));

const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'PROMPTIZ', timestamp: new Date().toISOString() });
});

// 1. Generate Senior Prompt
app.post('/api/generate-prompt', async (req: Request, res: Response) => {
  try {
    const {
      rawIdea,
      category = 'image',
      targetAi = 'Midjourney / Flux / SD',
      depth = 'Senior Principal',
      tone = 'Authoritative & Hyper-detailed',
      customSpecifications = '',
      includeVariables = true,
    } = req.body;

    if (!rawIdea || typeof rawIdea !== 'string') {
      res.status(400).json({ error: 'Please provide a prompt idea or description.' });
      return;
    }

    const ai = getAiClient();

    const systemInstruction = `
You are the Chief Prompt Engineer and Master AI Directive Architect of "PROMPTIZ".
Your mission is to construct elite, senior-grade prompt architectures that outperform standard generic prompts.

When crafting prompts, you MUST follow the PROMPTIZ Senior Engineering Architecture:
1. SENIOR ROLE & EXPERT QUALITIES: Open with an authoritative persona declaration ("Imagine you are a world-class, senior principal [Role] and leading authority in [Domain] with 15+ years of mastery...").
2. PRIMARY MISSION & CONTEXT: Define the precise objective, intent, and target outcome.
3. SPECIFICATIONS: Provide exhaustive, granular parameters:
   - For images: optical focal length, sensor, lighting style, color grading, render engine, volumetric effects, compositional rule, aspect ratio, micro-textures.
   - For code: system architecture, typing constraints, algorithmic complexity, error handling, modularity, zero-latency patterns.
   - For writing/business: psychological frame, audience resonance, cadence, rhetorical devices, retention hooks, anti-fluff boundaries.
4. BENCHMARK QUALITIES: Exact high-tier standards and non-negotiable craftsmanship metrics.
5. NEGATIVE BOUNDARIES: Strict constraints on what to strictly exclude or avoid (artifacts, cliché phrases, hallucinations, blurry edges, etc.).
6. OUTPUT STRUCTURE: How the AI should format and present its answer.
7. PROFESSIONAL DISCLAIMER: A concise, authoritative disclaimer regarding domain constraints, technical boundaries, or execution fidelity.
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
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/generate-prompt:', err);
    res.status(500).json({
      error: err?.message || 'Failed to generate prompt. Please verify server configuration.',
    });
  }
});

// 2. Refine / Re-Architect Existing Prompt
app.post('/api/refine-prompt', async (req: Request, res: Response) => {
  try {
    const { amateurPrompt, targetAi = 'Universal' } = req.body;

    if (!amateurPrompt || typeof amateurPrompt !== 'string') {
      res.status(400).json({ error: 'Please provide the prompt you want to refine.' });
      return;
    }

    const ai = getAiClient();

    const systemInstruction = `
You are the Senior Prompt Optimization Auditor at PROMPTIZ.
Analyze the user's rough or basic prompt and transform it into an elite, senior principal-level prompt.
Explain what was missing (e.g., lack of persona authority, ambiguity, missing lighting/architectural specs, lack of negative constraints).
Provide an audit score before (typically 15-45/100) and after (95-99/100) with diagnostic bullet points.
`;

    const userMessage = `
Transform this raw prompt into an enterprise senior prompt:
"${amateurPrompt}"
Target AI: ${targetAi}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        systemInstruction,
        temperature: 0.6,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            originalPrompt: { type: Type.STRING },
            refinedFullPrompt: { type: Type.STRING },
            originalScore: { type: Type.INTEGER },
            refinedScore: { type: Type.INTEGER },
            diagnostics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of key weaknesses identified in the original prompt',
            },
            keyImprovements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of architectural upgrades applied',
            },
            rolePersona: { type: Type.STRING },
            recommendedSettings: { type: Type.STRING },
          },
          required: [
            'originalPrompt',
            'refinedFullPrompt',
            'originalScore',
            'refinedScore',
            'diagnostics',
            'keyImprovements',
            'rolePersona',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/refine-prompt:', err);
    res.status(500).json({
      error: err?.message || 'Failed to refine prompt.',
    });
  }
});

// 3. Test Prompt Simulator
app.post('/api/test-prompt', async (req: Request, res: Response) => {
  try {
    const { promptText, modelRole = 'AI Assistant' } = req.body;

    if (!promptText || typeof promptText !== 'string') {
      res.status(400).json({ error: 'Please provide a prompt to test.' });
      return;
    }

    const ai = getAiClient();
    const startTime = Date.now();

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });

    const executionTimeMs = Date.now() - startTime;

    res.json({
      output: response.text || 'No response generated.',
      executionTimeMs,
      modelUsed: 'gemini-3.8-flash',
      testedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error in /api/test-prompt:', err);
    res.status(500).json({
      error: err?.message || 'Failed to test prompt.',
    });
  }
});

// Server lifecycle
if (!process.env.VERCEL) {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Vite dev server middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static dist in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PROMPTIZ engine listening on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });
}

export default app;
