// Serverless function to handle Retell Chat API requests
// This keeps your API key secure on the backend

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
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

  if (!RETELL_API_KEY) {
    console.error('RETELL_API_KEY environment variable not set');
    res.status(500).json({ error: 'Server configuration error' });
    return;
  }

  const { action, agent_id, chat_id, content } = req.body;

  try {
    if (action === 'create') {
      // Create a new chat session
      const response = await fetch('https://api.retellai.com/create-chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: agent_id
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Retell create-chat error:', response.status, errorText);
        res.status(response.status).json({
          error: 'Failed to create chat session',
          details: errorText
        });
        return;
      }

      const data = await response.json();
      res.status(200).json({
        chat_id: data.chat_id
      });
    }
    else if (action === 'message') {
      // Send a message and get response
      const response = await fetch('https://api.retellai.com/create-chat-completion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chat_id,
          content: content
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Retell chat message error:', response.status, errorText);
        res.status(response.status).json({
          error: 'Failed to send message',
          details: errorText
        });
        return;
      }

      const data = await response.json();
      res.status(200).json({
        response: data.messages || []
      });
    }
    else {
      res.status(400).json({ error: 'Invalid action. Use "create" or "message"' });
    }
  } catch (error) {
    console.error('Error in chat handler:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
}
