import { serve } from "https://deno.land/x/sift/mod.ts";
import { createClient } from "npm:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);

serve(async (req) => {
  try {
    const { callerNumber, message } = await req.json();

    // Example: Call OpenAI API to transcribe or handle the call
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant for a small business." },
          { role: "user", content: `Caller said: "${message}"` }
        ]
      })
    });
    const data = await aiResponse.json();

    // Save to Supabase DB
    await supabase.from("calls").insert({
      caller: callerNumber,
      message,
      ai_response: data.choices[0].message.content,
      created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true, ai_response: data.choices[0].message.content }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
});
