export default function SupportForm({
  subject,
  topic,
  message,
  onClick,
  change,
}: {
  subject: string;
  topic: string;
  message: string;
  onClick: () => void;
  change: any
}) {

  return (
    <div className="w-full bg-neutral-800 rounded-2xl p-10 overflow-auto smped">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Submit a Support Request
      </h1>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Subject
          </label>
          <input
          required
            type="text"
            className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Subject of your issue"
            value={subject ?? ""}
            onChange={(e) => change((prev: any) => ({...prev, subject: e.target.value}))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Related To
          </label>
          <select
          required
            className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-neutral-500"
            onChange={(e) => change((prev: any) => ({...prev, relatedTo: e.target.value}))}
            value={topic  ?? ""}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="bug">Bug or issue in code editor</option>
            <option value="account">Account or login issues</option>
            <option value="ai">Analysis AI issue</option>
            <option value="feature">Request a new feature</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1">
            Message
          </label>
          <textarea
          required
            rows={6}
            className="w-full px-4 py-3 bg-neutral-700 text-white rounded-lg outline-none resize-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Describe your issue in detail..."
            value={message  ?? ""}
            onChange={(e) => change((prev: any) => ({...prev, message: e.target.value}))}
          ></textarea>
        </div>
        <div>
          <button
            onClick={onClick}
            type="submit"
            className="bg-neutral-600 text-white px-6 py-3 rounded-lg hover:bg-neutral-500 transition-colors cursor-pointer"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
