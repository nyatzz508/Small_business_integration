#!/bin/bash

WORKDIR="./supabase"

# handleCall
echo "Invoking handleCall..."
npx supabase functions invoke handleCall --workdir $WORKDIR <<< '{"phone":"555-1234","message":"Test call"}'
echo ""

# handleLead
echo "Invoking handleLead..."
npx supabase functions invoke handleLead --workdir $WORKDIR <<< '{"name":"John Doe","email":"john@example.com"}'
echo ""

# businessTasks
echo "Invoking businessTasks..."
npx supabase functions invoke businessTasks --workdir $WORKDIR <<< '{"task":"followUp","leadId":123}'
echo ""
