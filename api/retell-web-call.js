// Serverless function to create Retell web calls and return access tokens
// This keeps your API key secure on the backend

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const RETELL_API_KEY = process.env.RETELL_API_KEY;
  const AGENT_ID = 'agent_81da82d9b3ff61a0d0918ae0f2';

  if (!RETELL_API_KEY) {
    console.error('RETELL_API_KEY environment variable not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  try {
    // Create a web call using Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RETELL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: AGENT_ID
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Retell API error:', response.status, errorText);
      res.status(response.status).json({
        error: 'Failed to create web call',
        details: errorText
      });
      return;
    }

    const data = await response.json();

    // Return the access token and call ID to the frontend
    res.status(200).json({
      access_token: data.access_token,
      call_id: data.call_id
    });

  } catch (error) {
    console.error('Error creating web call:', error);
    res.status(500).json({
      error: 'Failed to create web call',
      message: error.message
    });
  }
}
