// apps/web/lib/api.ts
export async function sendCall(callerNumber: string, message: string) {
  const res = await fetch('YOUR_SUPABASE_EDGE_FUNCTION_URL/handleCall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callerNumber, message }),
  });
  const data = await res.json();
  return data.ai_response;
}

export async function handleLead(info: string) {
  const res = await fetch('YOUR_SUPABASE_EDGE_FUNCTION_URL/handleLead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ info }),
  });
  const data = await res.json();
  return data.ai_response;
}

export async function handleTask(info: string) {
  const res = await fetch('YOUR_SUPABASE_EDGE_FUNCTION_URL/businessTasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ info }),
  });
  const data = await res.json();
  return data.ai_response;
}
