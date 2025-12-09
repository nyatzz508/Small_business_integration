// test-functions-v3.js
import 'dotenv/config'; // load .env automatically
import { createClient } from '@supabase/supabase-js';

// Grab environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase URL or Service Role Key in .env');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Calls a Supabase Edge Function and logs response.
 * @param {string} functionName - name of the deployed function
 * @param {Object} payload - object to send as JSON body
 */
async function callFunction(functionName, payload) {
  try {
    const { data, error } = await supabase.functions.invoke(functionName, {
      body: JSON.stringify(payload),
    });

    if (error) {
      console.error(`Error calling ${functionName}:`, error);
    } else {
      console.log(`Response from ${functionName}:`, data);
    }
  } catch (err) {
    console.error(`Exception calling ${functionName}:`, err);
  }
}

async function main() {
  console.log('Invoking handleCall...');
  await callFunction('handleCall', { phone: '555-1234', message: 'Test call' });

  console.log('\nInvoking handleLead...');
  await callFunction('handleLead', { name: 'John Doe', email: 'john@example.com' });

  console.log('\nInvoking businessTasks...');
  await callFunction('businessTasks', { task: 'Send reminder', due: '2025-12-10' });
}

main();
