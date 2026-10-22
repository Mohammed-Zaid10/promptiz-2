import { GeneratedPrompt } from '../types';

export const GOLDEN_TEMPLATES: GeneratedPrompt[] = [
  {
    id: 'golden-image-vogue',
    title: 'Editorial Haute Couture Photography (8K Master)',
    category: 'image',
    rolePersona: 'Principal Fashion Cinematographer & Master Visual Director',
    fullPrompt: `Imagine you are an elite, world-class haute couture visual director and master cinematographer with 20+ years of editorial experience shooting cover stories for Vogue Italia and Harper's Bazaar. You possess an obsessive eye for textile micro-weaves, Rembrandt chiaroscuro lighting, and authentic high-fashion human emotion.

Now, your primary objective is to create a museum-grade editorial portrait of a striking Scandinavian muse wearing an architectural, sculptural black cashmere coat adorned with handcrafted titanium filigree embellishments.

SPECIFICATIONS:
- Shot on: Hasselblad H6D-100c medium format camera with Hasselblad HC 100mm f/2.2 prime lens
- Camera Settings: 1/250s, f/2.8 aperture, ISO 64, manual focus razor-sharp on the subject's iris
- Lighting Architecture: Key light via 5-foot Profoto octa-box positioned 45° camera left, gentle silver rim light catching jawline silhouette, subtle negative fill on camera right for rich organic shadow falloff
- Composition: High-fashion medium close-up, rule-of-thirds alignment, cinematic 8K horizontal framing
- Color Science: Desaturated monochromatic charcoal palette with deep carbon blacks, neutral platinum skin tones, zero artificial warm tints
- Environment: Minimalist brutalist concrete studio wall with subtle wet grain textures and faint atmospheric dust motes suspended in the light beam

BENCHMARK QUALITIES:
- Visible human micro-textures: natural skin pores, delicate flyaway hair strands, tactile cashmere fibers, metallic reflections on titanium
- Masterwork tonal transitions with smooth 16-bit gradations
- Hyper-realistic optical depth of field with creamy circular bokeh in background
- Distinctive high-end editorial gravitas and unflinching gaze

NEGATIVE BOUNDARIES / CONSTRAINTS:
- No plastic artificial skin smoothing, no CGI-looking specular sheen
- No anatomical distortion, no extra fingers or warped hand structures
- No saturated neon hues or oversaturated chromatic aberrations
- No generic AI stock photography postures

DISCLAIMER:
This prompt is calibrated specifically for photorealistic diffusion and autoregressive image models. Optical parameters and equipment nomenclature are structured to guide deep latent attention weights toward medium-format physical camera physics.

EXECUTION DIRECTIVE:
Now, generate this museum-grade haute couture portrait adhering with relentless fidelity to every single parameter and nuance established above.`,
    breakdown: {
      role: 'Imagine you are an elite, world-class haute couture visual director and master cinematographer with 20+ years of editorial experience shooting cover stories for Vogue Italia and Harper\'s Bazaar.',
      directives: 'Create a museum-grade editorial portrait of a striking Scandinavian muse wearing an architectural, sculptural black cashmere coat adorned with handcrafted titanium filigree embellishments.',
      specifications: [
        'Hasselblad H6D-100c medium format camera with 100mm f/2.2 prime lens',
        'Key light via 5ft Profoto octa-box at 45° with silver rim light and negative fill',
        'Desaturated monochromatic charcoal palette with deep carbon blacks and platinum skin tones',
        'Minimalist brutalist concrete studio background with tactile grain',
      ],
      qualities: [
        'Visible human micro-textures (skin pores, tactile cashmere fibers)',
        '16-bit smooth tonal gradations and authentic optical falloff',
        'High-end editorial gravitas and museum-grade composure',
      ],
      negativeConstraints: [
        'No plastic skin smoothing or CGI wax sheen',
        'No anatomical deformities or warped fingers',
        'No neon colors or saturated tints',
      ],
      disclaimer: 'Calibrated for state-of-the-art diffusion models (Midjourney v6.1, Flux.1 Pro) using physical optical camera semantics.',
      invocation: 'Now, generate this museum-grade haute couture portrait adhering with relentless fidelity to every single parameter and nuance established above.',
    },
    recommendedSettings: '--ar 16:9 --v 6.1 --style raw --stylize 180',
    variables: [
      { name: 'subject', defaultValue: 'Scandinavian muse', description: 'Subject of the portrait' },
      { name: 'garment', defaultValue: 'architectural black cashmere coat with titanium filigree', description: 'Attire' },
      { name: 'lens', defaultValue: 'Hasselblad HC 100mm f/2.2 prime', description: 'Camera lens' },
    ],
    engineeringNotes: 'Uses physical camera physics and medium-format equipment tokens to force latent models out of generic 3D-render styles into authentic optical photography.',
    targetAi: 'Midjourney / Flux / SD',
    createdAt: Date.now() - 10000000,
  },
  {
    id: 'golden-code-architect',
    title: 'Staff Distributed Systems Architect (High-Throughput Go/Rust)',
    category: 'code',
    rolePersona: 'Staff Systems Architect & Low-Latency Infrastructure Engineer',
    fullPrompt: `Imagine you are a Staff Distributed Systems Architect and Principal Infrastructure Engineer with 18+ years of experience designing mission-critical, sub-millisecond trading pipelines and high-throughput ingestion clusters processing 10,000,000+ RPS.

Now, your primary objective is to architect an ultra-resilient, zero-allocation concurrent event processing queue in Go/Rust with strict backpressure mechanisms and lock-free ring buffer semantics.

SPECIFICATIONS:
- Concurrency Model: Lock-free LMAX Disruptor-style ring buffer utilizing atomic memory primitives (CAS operations)
- Memory Footprint: Zero-allocation on the steady-state hot path; utilize pre-allocated slab caches to avoid garbage collection pauses
- Backpressure Strategy: Adaptive drop/spillover telemetry with configurable exponential backoff and batch-flushing heuristics
- Error Handling: Resilient circuit-breaker pattern with structured panic-safe unwinding and zero silent failures
- Observability: OpenTelemetry metrics instrumentation tracking p99.9 latency, buffer saturation, and throughput rate

BENCHMARK QUALITIES:
- Idempotent and strictly thread-safe execution across multi-core NUMA architectures
- Idiomatic, crystal-clear code structure adhering to standard production best practices
- Comprehensive inline architectural reasoning documenting concurrency invariants
- Production-ready benchmarks and deterministic unit tests verifying edge-case contention

NEGATIVE BOUNDARIES / CONSTRAINTS:
- Do not use naive global mutex locks or blocking synchronization on the hot loop
- Do not include mock stubs, unfinished TODO placeholders, or pseudocode
- Do not omit error propagation or use generic un-typed catch blocks
- Avoid external third-party bloat; rely strictly on standard primitives and proven zero-dependency patterns

DISCLAIMER:
This implementation architecture assumes target execution on modern multi-core Linux platforms with NUMA-aware memory scheduling. Verify kernel thread affinity and file descriptor limits before production deployment.

EXECUTION DIRECTIVE:
Now, generate the complete, compilable production implementation along with stress benchmarks and concurrency invariant proofs strictly adhering to the technical specifications above.`,
    breakdown: {
      role: 'Staff Distributed Systems Architect and Principal Infrastructure Engineer with 18+ years designing sub-millisecond trading and streaming systems.',
      directives: 'Architect an ultra-resilient, zero-allocation concurrent event processing queue with lock-free ring buffer semantics.',
      specifications: [
        'Lock-free LMAX Disruptor ring buffer using atomic CAS memory operations',
        'Zero allocation on hot-path with pre-allocated slab memory caches',
        'Adaptive backpressure and circuit-breaker telemetry',
        'OpenTelemetry p99.9 latency and throughput metric collectors',
      ],
      qualities: [
        'Thread-safe across multi-core NUMA topologies',
        'Production-ready deterministic unit and stress benchmarks',
        'Zero silent errors or unhandled panics',
      ],
      negativeConstraints: [
        'No naive mutex contention on hot paths',
        'No TODO placeholders or incomplete code stubs',
        'No unverified external third-party bloat',
      ],
      disclaimer: 'Engineered for low-latency kernel environments; verify thread affinity and atomic CAS support.',
      invocation: 'Now, generate the complete, compilable production implementation along with stress benchmarks and concurrency invariant proofs strictly adhering to the technical specifications above.',
    },
    recommendedSettings: 'Temperature: 0.1, Top-P: 0.95 (Deterministic Code Generation)',
    variables: [
      { name: 'language', defaultValue: 'Go / Rust', description: 'Target programming language' },
      { name: 'throughput', defaultValue: '10,000,000+ RPS', description: 'Expected scale' },
      { name: 'concurrency_pattern', defaultValue: 'Lock-free Ring Buffer', description: 'Core pattern' },
    ],
    engineeringNotes: 'Constrains language-specific runtime edge cases and forces zero-allocation idioms by establishing strict performance requirements.',
    targetAi: 'Claude 3.7 / Cursor / GPT-4o',
    createdAt: Date.now() - 5000000,
  },
  {
    id: 'golden-video-cinematic',
    title: 'Cinematic Noir Drone Sequence (Runway Gen-3 / Sora)',
    category: 'video',
    rolePersona: 'Senior Film Director of Photography & Aerial Cinematographer',
    fullPrompt: `Imagine you are an acclaimed cinematic director of photography and aerial cinematography specialist with multiple Palme d'Or awards for groundbreaking visual storytelling and atmospheric world-building.

Now, your primary objective is to direct a continuous 8-second cinematic tracking shot capturing a rain-drenched brutalist skyscraper in an abandoned futuristic metropolis at twilight.

SPECIFICATIONS:
- Motion Vector: Smooth descending continuous crane shot shifting smoothly into a low-angle tracking push forward
- Lens & Focal Physics: Anamorphic 35mm lens with horizontal streak flaring, authentic spherical barrel distortion at frame perimeters, f/2.0 aperture
- Lighting & Atmospheric FX: Volumetric sodium-vapor streetlight reflections on wet dark asphalt, swirling low-altitude fog, gentle rain droplets catching streetlight backlight
- Color Timing: Deep Kodachrome monochrome noir with subtle graphite midtones, deep charcoal blacks, and high-contrast specular puddle reflections
- Temporal Cadence: Realistic 24fps cinematic pacing with physical camera inertia; zero unnatural robotic acceleration or jitter

BENCHMARK QUALITIES:
- Physical consistency across frames: rain physics adhere to gravity and wind turbulence
- Stable geometric perspective on architectural facades without morphing or warping textures
- True cinematic depth and evocative, moody emotional tension

NEGATIVE BOUNDARIES / CONSTRAINTS:
- No morphing buildings, no rubbery elastic geometry, no AI flickering between frames
- No erratic camera pans or disorienting drone spin
- No cartoonish CGI saturation or videogame-like lighting

DISCLAIMER:
Temporal consistency instructions are engineered to align with video diffusion token conditioning. Keep temporal motion prompt concise while prioritizing physical lighting cues.

EXECUTION DIRECTIVE:
Now, generate this cinematic film sequence adhering with absolute visual discipline to the camera trajectory, atmospheric nuances, and optical parameters described above.`,
    breakdown: {
      role: 'Acclaimed cinematic director of photography and aerial cinematography specialist.',
      directives: 'Direct a continuous 8-second cinematic tracking shot of a rain-drenched brutalist skyscraper at twilight.',
      specifications: [
        'Continuous descending crane shot shifting into low-angle push',
        'Anamorphic 35mm lens with physical horizontal streak flaring',
        'Volumetric street-light reflections on wet asphalt with realistic atmospheric fog',
        '24fps cinematic pacing with natural physical inertia',
      ],
      qualities: [
        'Persistent architectural geometry without morphing artifacts',
        'Accurate fluid dynamics and wind-swept rain physics',
        'Film-grade monochrome noir tonal grading',
      ],
      negativeConstraints: [
        'No frame flickering or warping textures',
        'No erratic camera spins or unnatural accelerations',
        'No video game CGI look',
      ],
      disclaimer: 'Optimized for modern video diffusion models (Runway Gen-3 Alpha, Sora, Kling 1.5).',
      invocation: 'Now, generate this cinematic film sequence adhering with absolute visual discipline to the camera trajectory, atmospheric nuances, and optical parameters described above.',
    },
    recommendedSettings: 'Duration: 8s, Motion: 5, Smooth Camera Inertia',
    variables: [
      { name: 'subject', defaultValue: 'rain-drenched brutalist skyscraper', description: 'Central subject' },
      { name: 'time_of_day', defaultValue: 'twilight / midnight', description: 'Lighting time' },
      { name: 'camera_movement', defaultValue: 'descending crane into forward push', description: 'Camera motion' },
    ],
    engineeringNotes: 'Uses physical camera motion vectors and atmospheric lighting physics to constrain video diffusion models against common warp/morph artifacts.',
    targetAi: 'Runway Gen-3 / Sora / Kling',
    createdAt: Date.now() - 2000000,
  },
  {
    id: 'golden-business-gtm',
    title: 'Chief Strategy Officer & Enterprise GTM Architect',
    category: 'business',
    rolePersona: 'Senior Partner at McKinsey & Global Enterprise GTM Architect',
    fullPrompt: `Imagine you are a Senior Partner at an elite top-tier management consultancy and former Chief Commercial Officer who has scaled multiple B2B enterprise software companies from $10M to $250M+ ARR. You combine ruthless analytical rigor with deep board-level strategic foresight.

Now, your primary objective is to formulate a defensible, multi-horizon Go-To-Market (GTM) playbook and competitive moat strategy for an enterprise AI governance and security platform targeting Fortune 500 Chief Information Security Officers (CISOs).

SPECIFICATIONS:
- Strategic Framework: McKinsey 3 Horizons of Growth mapped directly against enterprise adoption friction
- Target Buyer Persona: Enterprise CISO & Head of Compliance operating under stringent SEC and EU AI Act regulatory scrutiny
- Economic Moat Architecture: Data gravity flywheel, regulatory lock-in, and switching costs calculated via quantified ROI models
- Pricing & Packaging Matrix: Value-based consumption tiers paired with annual enterprise baseline commitments and multi-year escalators
- Sales Motion: Land-and-expand product-led sales (PLS) cadence transitioning into executive strategic partner agreements

BENCHMARK QUALITIES:
- Analytical precision with realistic unit economic metrics (CAC payback < 11 months, Net Revenue Retention > 135%)
- Actionable boardroom-ready executive synthesis with zero vague consulting buzzwords
- Concrete risk mitigation matrix addressing regulatory volatility and vendor consolidation

NEGATIVE BOUNDARIES / CONSTRAINTS:
- Avoid generic high-level platitudes like "leverage synergies" or "empower teams"
- Do not provide superficial bullet lists without operational mechanics
- Avoid ungrounded financial projections unsupported by market benchmarks

DISCLAIMER:
Strategic projections require validation against macroeconomic cost-of-capital conditions and industry-specific procurement cycle velocities.

EXECUTION DIRECTIVE:
Now, synthesize the complete enterprise GTM playbook, positioning narrative, and quantitative operational roadmap adhering strictly to the architectural specifications outlined above.`,
    breakdown: {
      role: 'Senior Partner at an elite top-tier management consultancy and former CCO who scaled B2B tech to $250M+ ARR.',
      directives: 'Formulate an enterprise GTM playbook and economic moat for an AI governance platform targeting Fortune 500 CISOs.',
      specifications: [
        'McKinsey 3 Horizons framework mapped against enterprise adoption friction',
        'Target buyer: Enterprise CISO navigating SEC and EU AI Act mandates',
        'Quantified economic moat: data gravity, regulatory compliance lock-in',
        'Value-based pricing matrix with land-and-expand sales motion',
      ],
      qualities: [
        'Quantified unit economics (CAC payback < 11mo, NRR > 135%)',
        'Executive board-level clarity with zero empty buzzwords',
        'Operational risk mitigation and procurement playbooks',
      ],
      negativeConstraints: [
        'No empty consulting jargon without operational substance',
        'No generic unquantified claims',
      ],
      disclaimer: 'Financial and procurement models require calibration to prevailing macroeconomic capital cycles.',
      invocation: 'Now, synthesize the complete enterprise GTM playbook, positioning narrative, and quantitative operational roadmap adhering strictly to the architectural specifications outlined above.',
    },
    recommendedSettings: 'System Temperature: 0.3 (High Analytical Precision)',
    variables: [
      { name: 'product_category', defaultValue: 'Enterprise AI Governance & Security', description: 'Product domain' },
      { name: 'target_icp', defaultValue: 'Fortune 500 CISOs', description: 'Target buyer' },
      { name: 'revenue_target', defaultValue: '$10M to $100M ARR', description: 'Scale goal' },
    ],
    engineeringNotes: 'Enforces quantitative rigor and specific buyer persona psychology to prevent generic business fluff.',
    targetAi: 'ChatGPT-4o / Claude 3.7 / Gemini Pro',
    createdAt: Date.now() - 1000000,
  },
];
