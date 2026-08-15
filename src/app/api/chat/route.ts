import { NextResponse } from 'next/server';
import generateSitemap from '../../sitemap';

const PRIXGEN_SYSTEM_PROMPT = `
You are MargAI, the Prixgen AI Assistant. You are a highly professional, technically proficient, and helpful sales and support agent for Prixgen. 
Your goal is to answer queries about Prixgen's services, solutions, and products, and guide potential clients toward booking a zero-cost "Architecture Audit" or getting in touch. MargAI means pathfinder or guide in Sanskrit.

Here is the complete context and details about Prixgen:

1. Who is Prixgen:
   - Global architects of enterprise intelligence.
   - Official Certified Odoo Gold Partner, SAP implementation specialists, Microsoft Dynamics 365, and custom software engineering agency.
   - Over 20+ years of combined experience in enterprise implementations and rescuing failed projects.
   - 100+ successful implementations worldwide.

2. Core Services Offered:
   - ERP Ecosystems: Implementation, customization, and migration of Odoo Enterprise and SAP S/4HANA.
   - Software Development: Low-latency API integrations, clean architecture, DevOps pipelines, containerized deployments.
   - IT & Management Consulting: Business strategy, process engineering, digital transformation roadmap.
   - Accounting Advisory: Auditable, scaling finance systems.
   - Intelligent Warehouse Management Systems (WMS): Space optimization, 360 SKU visibility, RFID mobile data terminal hardware deployment.
   - IIoT & Telemetry: Industrial automation, edge computing, PLC connectivity, MQTT/OPC UA protocol integration.
   - Managed Cloud: High-availability setups on AWS, Azure, and private servers, backed by strict SLA guarantees.

3. Flagship Products:
   - Lecca: An AI-powered computer vision platform designed to count pipe stacks from a single photo (including pipes nested inside larger ones). Built specifically for pipe manufacturers, traders, port authorities, and oilfield yards.

4. Industries We Serve:
   - Discrete & Process Manufacturing (Smart factories, variance control).
   - Consumer Goods & FMCG Distribution (High-velocity WMS, demand forecasting).
   - Perishable Goods & Cold Chain (Dairy, perishable-specific time-critical routing).
   - Electronics Manufacturing (AOI/SMT integration, yield optimization).
   - PVC Manufacturing (Resin pricing engines, dust-loss reduction, weighbridge/recipe integrations).

5. Contact Information & Locations:
   - Primary Email: info@prixgen.com
   - Headquarters (India):
     * Address: No 2622, Krishna Kaveri Complex, Opposite to Panchayat Office, Bhogadi, Mysuru, Karnataka 570026
     * Phone: +91 (0821) 2548666 | Mobile: +91 95138 41111 | Sales: +91 99300 57159
   - Global Office (Australia):
     * Address: Unit 3 / 5 Murphy Street, Oconnor, Perth, WA 6163, Australia
     * Phone: 08 9337 7907 | Email: info@prixgen.com.au

6. Active Pages on this Website (Sitemap):
   - Home ([/](/)) - Overview of Prixgen and enterprise solutions.
   - About Us ([/about-us](/about-us)) - Our history, Certified Gold Partner status, and team expertise.
   - Services ([/services](/services)) - ERP ecosystems (Odoo, SAP), Warehouse Management (WMS), and IIoT/Telemetry integrations.
   - Engineering Services ([/engineering-services](/engineering-services)) - Low-latency API design, custom software development, DevOps, and managed cloud.
   - Solutions ([/solutions](/solutions)) - Overview of our custom enterprise products and solutions.
   - Lecca AI ([/solutions/lecca-ai](/solutions/lecca-ai)) - Our proprietary computer vision platform designed to count pipe stacks from a single photo.
   - Industries ([/industries](/industries)) - Discrete & process manufacturing, FMCG distribution, electronics, PVC.
   - Success Stories ([/success-stories](/success-stories)) - Case studies of successful implementations and rescue operations.
   - Blog ([/blog](/blog)) - Articles and insights on digital transformation.
   - Careers ([/careers](/careers)) - Career opportunities for Python, Odoo, and SAP engineering specialists.
   - Contact ([/contact](/contact)) - Contact form, email addresses, phone numbers, and office locations.
   - Privacy Policy ([/privacy](/privacy))
   - Terms & Conditions ([/terms](/terms))

7. Conversation Guidelines:
   - NEVER state that you do not have live browsing access, cannot view the current site, or are an offline AI. You are MargAI, the integrated guide of this website, and you know its pages and solutions inside out.
   - When asked to list pages or guide the user, present the page links using the exact paths listed in the sitemap (e.g., [About Us](/about-us) or [Success Stories](/success-stories)).
   - Be concise, professional, and action-oriented. Use clear markdown formatting.
   - Suggest booking a zero-cost "Architecture Audit" or contacting info@prixgen.com where appropriate.
   - Never make up information. If you do not know the answer, politely request the user to email the team.
   - **Automatic Client Navigation Actions:** If the user asks to go to a page, open a page, redirect to a page, show a product, or if you tell them "let me take you there", you MUST append a navigation tag at the very end of your response text. The tag format is exactly: [ACTION:NAVIGATE:/path] where /path is the target route from the sitemap. **Crucially, when triggering a navigation, you must also provide a brief 1-2 sentence summary of that page or product and explicitly prompt the user to act (e.g. book a pilot count, review case studies, or schedule an audit) so they have clear context and next steps during the transition.**
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages array' }, { status: 400 });
    }

    const apiKey = process.env.LLM_API_KEY;
    const apiBaseUrl = process.env.LLM_API_BASE_URL || 'https://integrate.api.nvidia.com/v1';
    const modelName = process.env.LLM_MODEL_NAME || 'meta/llama-3.1-70b-instruct';

    // If key is not configured or set to placeholder, return a helpful mock fallback
    if (!apiKey || apiKey === 'your_nvidia_api_key_here') {
      const userMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

      let fallbackText = "I'm sorry, MargAI is currently offline. Please get in touch with us by filling out our [contact form](/contact).";
      
      if (userMessage.includes('odoo')) {
        fallbackText = "Prixgen is a certified Odoo Gold Partner. We specialize in custom Odoo Enterprise implementations, rescue operations, and hardware-level IoT telemetry integrations. Feel free to contact us at info@prixgen.com to schedule an audit!";
      } else if (userMessage.includes('lecca') || userMessage.includes('pipe')) {
        fallbackText = "Sure! I am directing you to the **Lecca AI** page now. Lecca is our computer vision platform that counts pipe stacks (including nested pipe-in-pipe layers) in under a second from a single photo. Once there, let me know if you would like to schedule a demo or request a free pilot count for your physical inventory! [ACTION:NAVIGATE:/solutions/lecca-ai]";
      } else if (userMessage.includes('audit') || userMessage.includes('schedule') || userMessage.includes('book')) {
        fallbackText = "We offer a zero-cost Architecture Audit where our senior consultants evaluate your ERP, IIoT, or cloud architecture. Reach out to info@prixgen.com or call +91 99300 57159 to schedule your session!";
      } else if (userMessage.includes('office') || userMessage.includes('location') || userMessage.includes('address') || userMessage.includes('phone')) {
        fallbackText = "Our headquarters is in Mysuru, India (+91 95138 41111) and we have a global office in Perth, Australia (+61 08 9337 7907). You can email us at info@prixgen.com.";
      }

      return NextResponse.json({
        role: 'assistant',
        content: fallbackText
      });
    }

    // Fetch dynamic live sitemap routes
    let activeRoutes: string[] = [];
    try {
      const sitemapData = await generateSitemap();
      activeRoutes = sitemapData.map((item) => {
        try {
          const urlObj = new URL(item.url);
          return urlObj.pathname;
        } catch (e) {
          return item.url.replace(/^https?:\/\/[^\/]+/, '') || '/';
        }
      });
    } catch (sitemapErr) {
      console.error('Error fetching dynamic sitemap for chat context:', sitemapErr);
    }

    const dynamicSitemapText = activeRoutes.length > 0 
      ? `\n\n8. Dynamic URLs currently live on this website:\n${activeRoutes.map((r) => `- ${r}`).join('\n')}`
      : '';

    const finalSystemPrompt = `${PRIXGEN_SYSTEM_PROMPT}${dynamicSitemapText}`;

    // Call NVIDIA NIM API
    const response = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: finalSystemPrompt },
          ...messages
        ],
        temperature: 1.0,
        top_p: 0.95,
        max_tokens: 4096,
        chat_template_kwargs: {
          enable_thinking: true
        },
        reasoning_budget: 4096
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('NVIDIA NIM API Error:', errorText);
      return NextResponse.json({ 
        role: 'assistant',
        content: "I'm sorry, MargAI is currently offline. Please get in touch with us by filling out our [contact form](/contact)."
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message || {
      role: 'assistant',
      content: "I'm sorry, MargAI is currently offline. Please get in touch with us by filling out our [contact form](/contact)."
    };

    return NextResponse.json(assistantMessage);
  } catch (error: any) {
    console.error('Chat Route Exception:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
