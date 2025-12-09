import fetch from "node-fetch";

const PROJECT_URL = "https://euyailfwrjconyqonton.supabase.co";
const ANON_KEY = process.env.SUPABASE_ANON_KEY;

async function invoke(fn, body) {
  console.log(`\nInvoking ${fn}...`);

  const res = await fetch(`${PROJECT_URL}/functions/v1/${fn}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sb_secret_BQs_NWvBY_iPhKM5tsraDw_BmL_TseC}`,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  console.log("Status:", res.status);
  console.log("Response:");
  console.log(text);
}

async function main() {
  await invoke("handleCall", {
    phone: "555-1234",
    message: "Hello world",
  });

  await invoke("handleLead", {
    name: "Test User",
    phone: "555-1111",
    service: "HVAC",
  });

  await invoke("businessTasks", {
    task: "daily-check",
  });
}

main();
