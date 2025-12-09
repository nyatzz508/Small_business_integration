import { useState } from "react";
import { sendCall, handleLead, handleTask } from "../lib/api";

export default function Dashboard() {
  const [callNumber, setCallNumber] = useState("");
  const [callMessage, setCallMessage] = useState("");
  const [callResponse, setCallResponse] = useState("");

  const [leadInfo, setLeadInfo] = useState("");
  const [leadResponse, setLeadResponse] = useState("");

  const [taskInfo, setTaskInfo] = useState("");
  const [taskResponse, setTaskResponse] = useState("");

  // Submit handlers
  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendCall(callNumber, callMessage);
    setCallResponse(res);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLead(leadInfo);
    setLeadResponse(res);
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleTask(taskInfo);
    setTaskResponse(res);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Local Trades AI Dashboard</h1>

      {/* After-Hours Calls */}
      <section className="p-4 border rounded bg-white shadow-sm space-y-2">
        <h2 className="text-xl font-semibold">After-Hours Call</h2>
        <form onSubmit={handleCallSubmit} className="space-y-2">
          <input
            className="border p-2 w-full"
            placeholder="Caller Number"
            value={callNumber}
            onChange={(e) => setCallNumber(e.target.value)}
          />
          <textarea
            className="border p-2 w-full"
            placeholder="Message"
            value={callMessage}
            onChange={(e) => setCallMessage(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
            Send to AI
          </button>
        </form>
        {callResponse && (
          <div className="mt-2 p-2 border rounded bg-gray-100">
            <strong>AI Response:</strong> {callResponse}
          </div>
        )}
      </section>

      {/* Sales Leads */}
      <section className="p-4 border rounded bg-white shadow-sm space-y-2">
        <h2 className="text-xl font-semibold">Sales Lead</h2>
        <form onSubmit={handleLeadSubmit} className="space-y-2">
          <textarea
            className="border p-2 w-full"
            placeholder="Lead Info"
            value={leadInfo}
            onChange={(e) => setLeadInfo(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
            Process Lead
          </button>
        </form>
        {leadResponse && (
          <div className="mt-2 p-2 border rounded bg-gray-100">
            <strong>AI Response:</strong> {leadResponse}
          </div>
        )}
      </section>

      {/* Business Tasks */}
      <section className="p-4 border rounded bg-white shadow-sm space-y-2">
        <h2 className="text-xl font-semibold">Business Tasks</h2>
        <form onSubmit={handleTaskSubmit} className="space-y-2">
          <textarea
            className="border p-2 w-full"
            placeholder="Task Info"
            value={taskInfo}
            onChange={(e) => setTaskInfo(e.target.value)}
          />
          <button className="bg-purple-500 text-white px-4 py-2 rounded" type="submit">
            Run Task
          </button>
        </form>
        {taskResponse && (
          <div className="mt-2 p-2 border rounded bg-gray-100">
            <strong>AI Response:</strong> {taskResponse}
          </div>
        )}
      </section>
    </div>
  );
}
