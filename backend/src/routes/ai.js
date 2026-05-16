import { Router } from 'express';

const router = Router();

router.post('/generate', async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'prompt is required' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        input: prompt
      })
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      return res.status(response.status).json({ error: 'OpenAI request failed', details: errorPayload });
    }

    const data = await response.json();
    const output = data.output_text || '';
    return res.json({ output, raw: data });
  } catch (error) {
    return res.status(500).json({ error: 'AI generation failed', details: error.message });
  }
});

export default router;
