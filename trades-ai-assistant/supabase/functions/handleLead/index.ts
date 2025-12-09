import { serve } from "https://deno.land/x/sift/mod.ts";
import { createClient } from "npm:@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!
);

serve(async (req) => {
  try {
    const { info } = await req.json();

    // Example: AI evaluates the lead information
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI that qualifies sales leads for small businesses." },
          { role: "user", content: `Lead Info: "${info}"` }
        ]
      })
    });
    const data = await aiResponse.json();

    // Store in Supabase DB
    await supabase.from("leads").insert({
      lead_info: info,
      ai_response: data.choices[0].message.content,
      created_at: new Date().toISOString()
    });

    return new Response(JSON.stringify({ success: true, ai_response: data.choices[0].message.content }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
});
