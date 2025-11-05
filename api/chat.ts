// Edge Function to handle Retell Chat API requests securely
// This keeps your API key secure on the backend

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const RETELL_API_KEY = process.env.RETELL_API_KEY;

  if (!RETELL_API_KEY) {
    console.error('RETELL_API_KEY environment variable not set');
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const { action, agent_id, chat_id, content } = body;

    if (action === 'create') {
      // Create a new chat session
      const response = await fetch('https://api.retellai.com/create-chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_id }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Retell create-chat error:', response.status, errorText);
        return new Response(
          JSON.stringify({
            error: 'Failed to create chat session',
            details: errorText,
          }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const data = await response.json();
      return new Response(
        JSON.stringify({ chat_id: data.chat_id }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } else if (action === 'message') {
      // Send a message and get response
      const response = await fetch('https://api.retellai.com/create-chat-completion', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id,
          content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Retell chat message error:', response.status, errorText);
        return new Response(
          JSON.stringify({
            error: 'Failed to send message',
            details: errorText,
          }),
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }

      const data = await response.json();
      return new Response(
        JSON.stringify({ response: data.messages || [] }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Use "create" or "message"' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  } catch (error: any) {
    console.error('Error in chat handler:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
}
