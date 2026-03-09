import { useState } from "react";

const sections = [
  {
    id: "big-picture",
    title: "The Big Picture",
    content: (
      <p className="text-gray-300 leading-relaxed">
        You have a personal infrastructure system that persists knowledge across AI sessions. The core problem it solves: every new Claude session starts cold with no memory. ML OS fixes that by keeping state in git repos that any agent can pull and read.
        <br /><br />
        There are two repos. A task system. A sync layer. A query layer. That's basically it.
      </p>
    ),
  },
  {
    id: "repos",
    title: "The Two Repos",
    content: (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-blue-400 font-mono font-bold mb-2">Claude-Cowork-Vault <span className="text-gray-500 font-normal text-sm">(local folder: Home_Lab_2026)</span></h3>
          <p className="text-gray-300 mb-3">The <span className="text-yellow-400 font-semibold">vault</span> — your persistent storage.</p>
          <ul className="text-gray-400 text-sm space-y-1 font-mono mb-3">
            <li><span className="text-green-400">vault/mlos-dev/tasks.json</span> — all your tasks</li>
            <li><span className="text-green-400">vault/mlos-dev/decisions.md</span> — architectural decisions log</li>
            <li><span className="text-green-400">vault/mlos-dev/project-state.md</span> — auto-generated snapshot</li>
            <li><span className="text-green-400">.mlos/</span> — all the tooling</li>
          </ul>
          <div className="text-xs text-gray-500 space-y-1 font-mono">
            <div>Windows: <span className="text-gray-300">Z:\Projects\ML_OS\Home_Lab_2026</span></div>
            <div>Linux: <span className="text-gray-300">/mnt/share/Projects/ML_OS/Home_Lab_2026</span></div>
            <div>Remote: <span className="text-gray-300">github.com/mrmeman555/Claude-Cowork-Vault</span></div>
          </div>
          <p className="text-yellow-600 text-xs mt-3">Warning: The local folder is called Home_Lab_2026 but the GitHub repo is Claude-Cowork-Vault. They match. Don't let the name mismatch confuse you.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="text-purple-400 font-mono font-bold mb-2">OpenClaw_Claude</h3>
          <p className="text-gray-300 mb-3">The <span className="text-yellow-400 font-semibold">agent brain</span> — what makes Claude Code smart at boot.</p>
          <ul className="text-gray-400 text-sm space-y-1 font-mono mb-3">
            <li><span className="text-green-400">CLAUDE.md</span> — boot sequence every agent reads</li>
            <li><span className="text-green-400">.claude/commands/</span> — slash commands (/sync, /setup-sync)</li>
            <li><span className="text-green-400">.claude/INBOX.md</span> — cloud-to-local agent messages</li>
          </ul>
          <div className="text-xs text-gray-500 space-y-1 font-mono">
            <div>Windows: <span className="text-gray-300">Z:\Projects\ML_OS\OpenClaw_Claude</span></div>
            <div>Linux: <span className="text-gray-300">/mnt/share/Projects/ML_OS/OpenClaw_Claude</span></div>
            <div>Remote: <span className="text-gray-300">github.com/mrmeman555/OpenClaw_Claude</span></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "tasks",
    title: "The Task System",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-blue-800">
          <h3 className="text-blue-400 font-mono font-bold mb-3">task.sh — the only right way to touch tasks</h3>
          <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
            <li>Pull from remote (get latest state)</li>
            <li>Make the change (add / update / complete)</li>
            <li>Commit tasks.json and events.jsonl</li>
            <li>Push to GitHub</li>
            <li>Retry once if push fails</li>
          </ol>
          <p className="text-red-400 text-sm mt-3 font-semibold">Never call ingest.py directly. That bypasses pull-before-write.</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 font-mono text-sm">
          <div className="text-gray-500 mb-2"># Usage</div>
          <div className="text-green-400">bash .mlos/task.sh list --project mlos-dev</div>
          <div className="text-green-400">bash .mlos/task.sh add --project mlos-dev --title "..." --priority high --type task</div>
          <div className="text-green-400">bash .mlos/task.sh done &lt;task-id&gt;</div>
        </div>
        <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-700">
          <p className="text-yellow-400 text-sm font-semibold mb-1">Warning: Web Interface Fragility</p>
          <p className="text-gray-300 text-sm">Creating tasks from claude.ai bypasses task.sh — no pull-before-write, no merge driver. Known temporary risk while web-dependent.</p>
        </div>
      </div>
    ),
  },
  {
    id: "two-layer",
    title: "The Two-Layer Principle",
    content: (
      <div className="space-y-4">
        <p className="text-gray-300 text-sm">The core architectural idea. Everything follows from it.</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 border border-green-800">
            <div className="text-green-400 font-bold text-sm mb-1">Write Path</div>
            <div className="text-white font-mono text-sm mb-2">Git + GitHub</div>
            <div className="text-gray-400 text-xs">Source of truth. Immutable history. Multi-device sync. Git is never wrong.</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 border border-blue-800">
            <div className="text-blue-400 font-bold text-sm mb-1">Read Path</div>
            <div className="text-white font-mono text-sm mb-2">SQLite (watcher.db)</div>
            <div className="text-gray-400 text-xs">Fast queries. Derived from git. Rebuildable any time. Can be stale — that's okay.</div>
          </div>
        </div>
        <p className="text-gray-400 text-sm">If the vault browser shows the wrong task count, the problem is SQLite, not git. Restart server.py.</p>
      </div>
    ),
  },
  {
    id: "sync",
    title: "How Devices Stay in Sync",
    content: (
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-blue-400 text-sm font-semibold mb-1">Tasks</div>
          <div className="text-gray-300 text-sm">task.sh pulls before every write, pushes after. Automatic as long as you use task.sh.</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-purple-400 text-sm font-semibold mb-1">Transcripts</div>
          <div className="text-gray-400 text-sm space-y-1">
            <div>Linux: <span className="font-mono text-xs text-gray-300">~/.mlos/transcript-sync.sh</span> — cron every 1 min</div>
            <div>Windows: Scheduled task <span className="font-mono text-xs text-gray-300">MLOS-TranscriptSync</span> — robocopy every 1 min</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-yellow-400 text-sm font-semibold mb-1">Conflict Resolution</div>
          <div className="text-gray-400 text-sm">merge-driver.py handles tasks.json (newer timestamp wins) and events.jsonl (dedup + sort). Must be registered locally on each device.</div>
        </div>
      </div>
    ),
  },
  {
    id: "session",
    title: "How to Start a Session",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-green-800">
          <div className="text-green-400 font-semibold mb-2">Claude Code (local — recommended)</div>
          <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-300 space-y-1">
            <div className="text-gray-500"># Linux</div>
            <div>cd /mnt/share/Projects/ML_OS/Home_Lab_2026</div>
            <div>bash .mlos/bootstrap.sh</div>
            <div className="text-gray-500 mt-2"># Then inside Claude Code:</div>
            <div>/sync</div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-yellow-800">
          <div className="text-yellow-400 font-semibold mb-2">Web Interface (claude.ai)</div>
          <div className="text-gray-300 text-sm">Open the project. Use it for thinking and planning. Don't create tasks here unless you accept the fragility risk.</div>
        </div>
      </div>
    ),
  },
  {
    id: "breaks",
    title: "What Breaks and Why",
    content: (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-3 text-xs text-gray-500 px-3 pb-1">
          <div>Symptom</div><div>Cause</div><div>Fix</div>
        </div>
        {[
          { symptom: "Push rejected / non-fast-forward", cause: "Remote has commits local doesn't", fix: "git pull --rebase then push" },
          { symptom: "Vault browser wrong task count", cause: "SQLite is stale", fix: "Restart server.py" },
          { symptom: "Task from web chat didn't persist", cause: "Web chat bypassed task.sh", fix: "Check git log; pull on local devices" },
          { symptom: "New session has no context", cause: "Wrong project or CLAUDE.md not read", fix: "Check project; Claude Code reads CLAUDE.md on boot" },
          { symptom: "Merge conflict on tasks.json", cause: "Two devices pushed without pulling", fix: "Merge driver handles it; else keep newer entries" },
          { symptom: "Transcripts not syncing", cause: "Cron/scheduled task not running", fix: "Linux: crontab -l | Windows: Task Scheduler" },
        ].map((row, i) => (
          <div key={i} className="bg-gray-800 rounded-lg p-3 border border-gray-700 grid grid-cols-3 gap-3 text-sm">
            <div className="text-red-400">{row.symptom}</div>
            <div className="text-gray-400">{row.cause}</div>
            <div className="text-green-400 font-mono text-xs">{row.fix}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "files",
    title: "Files That Matter Most",
    content: (
      <div className="space-y-4 font-mono text-sm">
        <div className="bg-gray-800 rounded-lg p-4 border border-blue-800">
          <div className="text-blue-400 font-bold mb-2">Claude-Cowork-Vault/</div>
          <div className="space-y-1 text-xs pl-4">
            <div className="text-gray-500">vault/mlos-dev/</div>
            <div className="pl-4"><span className="text-green-400">tasks.json</span> <span className="text-gray-600">— all tasks, source of truth</span></div>
            <div className="pl-4"><span className="text-green-400">decisions.md</span> <span className="text-gray-600">— why things are the way they are</span></div>
            <div className="text-gray-500">.mlos/</div>
            <div className="pl-4"><span className="text-yellow-400">task.sh</span> <span className="text-gray-600">— ONLY way to touch tasks</span></div>
            <div className="pl-4"><span className="text-green-400">watcher.py</span> <span className="text-gray-600">— ingests transcripts to SQLite</span></div>
            <div className="pl-4"><span className="text-green-400">merge-driver.py</span> <span className="text-gray-600">— handles git conflicts</span></div>
            <div className="pl-4"><span className="text-green-400">bootstrap.sh</span> <span className="text-gray-600">— session start</span></div>
            <div><span className="text-green-400">server.py</span> <span className="text-gray-600">— vault browser (port 3001)</span></div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 border border-purple-800">
          <div className="text-purple-400 font-bold mb-2">OpenClaw_Claude/</div>
          <div className="space-y-1 text-xs pl-4">
            <div><span className="text-yellow-400">CLAUDE.md</span> <span className="text-gray-600">— agent boot sequence</span></div>
            <div className="text-gray-500">.claude/</div>
            <div className="pl-4"><span className="text-green-400">INBOX.md</span> <span className="text-gray-600">— cloud-to-local agent messages</span></div>
            <div className="pl-4"><span className="text-green-400">commands/sync.md</span> <span className="text-gray-600">— /sync command</span></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "north-star",
    title: "The North Star",
    content: (
      <p className="text-gray-300 leading-relaxed">
        The long-term goal is a custom chat interface that replaces claude.ai entirely — with the vault browser, knowledge graph, and terminal all in one window. Until then, the web interface is a temporary dependency with known fragility.
        <br /><br />
        Every system decision is made with that future in mind: <span className="text-blue-400">git as the spine</span>, <span className="text-green-400">SQLite as the query layer</span>, <span className="text-purple-400">agents as interchangeable inference engines</span>.
      </p>
    ),
  },
];

export default function MLOSOverview() {
  const [active, setActive] = useState("big-picture");
  const current = sections.find(s => s.id === active);

  return (
    <div className="bg-gray-950 text-white min-h-screen flex font-sans">
      <div className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <div className="text-xs text-gray-500 font-mono mb-1">ML OS</div>
          <div className="text-white font-bold text-sm">How This Thing Works</div>
          <div className="text-gray-500 text-xs mt-1 italic">Read this when you're foggy.</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                active === s.id
                  ? "bg-blue-900 text-blue-200"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {s.title}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800 text-xs text-gray-600 font-mono">
          t-19c06d · 2026-03-09
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-white mb-6">{current.title}</h2>
          {current.content}
        </div>
      </div>
    </div>
  );
}
