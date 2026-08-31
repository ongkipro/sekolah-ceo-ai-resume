import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface DiagramDef {
  id: string;
  title: string;
  speaker: string;
  subtitle: string;
  nodes: Array<{
    step: number;
    title: string;
    description: string;
    tool: string;
    icon: string;
  }>;
}

const DIAGRAMS: DiagramDef[] = [
  {
    id: 'growth-funnel',
    title: 'The Zero-CAC Organic Growth Funnel',
    speaker: 'Mas Anjas Maradita',
    subtitle: 'Mengubah tren audio dan avatar AI menjadi database prospek dan konversi instan tanpa bakar budget iklan.',
    nodes: [
      { step: 1, title: 'Viral Sound Branding', description: 'Membuat jingle komersial dan audio viral berkualitas studio dalam 30 detik.', tool: 'Suno AI', icon: '🎵' },
      { step: 2, title: 'Avatar Video Production', description: 'Memproduksi puluhan video edukasi founder/presenter tanpa biaya sewa studio.', tool: 'HeyGen / Kling AI', icon: '🎬' },
      { step: 3, title: 'Social Algorithmic Hook', description: 'Upload ke TikTok & Instagram dengan CTA: "Komen [KATA KUNCI] untuk dapat PDF".', tool: 'TikTok / IG Reels', icon: '📱' },
      { step: 4, title: 'Comment-to-DM Loop', description: 'Bot otomatis mengirimkan link penawaran, PDF materi, dan direct checkout ke DM.', tool: 'ManyChat Automation', icon: '💬' },
      { step: 5, title: 'Lead Ingestion to CRM', description: 'Data leads tersimpan di database penjualan untuk follow-up closing otomatis.', tool: 'CRM / Google Sheets', icon: '📈' },
    ],
  },
  {
    id: 'koran-perusahaan',
    title: 'The AI Morning Intelligence Engine ("Koran Perusahaan")',
    speaker: 'Mas Satya Pradana',
    subtitle: 'Sintesis otomatis seluruh divisi bisnis menjadi 1 halaman briefing terpadu jam 07.00 pagi untuk CEO.',
    nodes: [
      { step: 1, title: 'Multi-Source Data Feeds', description: 'Data sales harian, absensi fingerprint, tiket komplain pelanggan, dan stok gudang.', tool: 'POS / Fingerprint / DB', icon: '📊' },
      { step: 2, title: 'N8N Pipeline Orchestration', description: 'Workflow otomatis menarik data mentah setiap jam 06.00 pagi.', tool: 'N8N / Webhooks', icon: '⚡' },
      { step: 3, title: 'LLM Synthesis Agent', description: 'Claude / GPT menganalisis anomali, ringkasan omset, dan red-flag operasional.', tool: 'Claude / 9Router', icon: '🧠' },
      { step: 4, title: 'Telegram Executive Dispatch', description: 'Koran 1 halaman dikirim ke Telegram pribadi CEO tepat jam 07.00 pagi.', tool: 'Telegram Bot API', icon: '📰' },
      { step: 5, title: '1-Click Executive Action', description: 'CEO membaca dalam 3 menit dan memutuskan persetujuan PO/Deal tanpa meeting pagi.', tool: 'CEO Decision', icon: '🎯' },
    ],
  },
  {
    id: 'desktop-command',
    title: 'Local-First Desktop AI Command Center',
    speaker: 'Pak Natali Ardianto',
    subtitle: 'Integrasi folder Google Drive lokal dengan Claude Desktop dan shortcut global Option+Space tanpa cognitive friction.',
    nodes: [
      { step: 1, title: 'Physical File Sync', description: 'Google Drive / OneDrive dipasang sinkron fisik di harddisk komputer.', tool: 'Google Drive Desktop', icon: '📁' },
      { step: 2, title: 'Claude Projects Context', description: 'Menghubungkan folder fisik laporan keuangan dan dokumen ke Claude Desktop.', tool: 'Claude Desktop Projects', icon: '🖥️' },
      { step: 3, title: 'Global Hotkey Invocation', description: 'Menekan Option+Space (Mac) atau Ctrl+Alt+Space (Win) di atas aplikasi apa pun.', tool: 'Global Keyboard Shortcut', icon: '⌨️' },
      { step: 4, title: 'B.R.I.E.F. Prompting', description: 'Memberikan instruksi terstruktur dengan persona Senior Finance / Forensic Auditor.', tool: 'B.R.I.E.F. Framework', icon: '📝' },
      { step: 5, title: 'Instant .docx Memo Output', description: 'AI langsung menghasilkan Memo Audit Word resmi lengkap dengan kop surat dan tabel.', tool: 'Microsoft Word .docx', icon: '📄' },
    ],
  },
  {
    id: 'auto-po',
    title: 'Automated Supply Chain & Auto-PO Purchasing Engine',
    speaker: 'Mas Satya Pradana',
    subtitle: 'Otomatisasi pemesanan barang ke vendor rekanan saat inventaris gudang menyentuh batas minimum.',
    nodes: [
      { step: 1, title: 'Warehouse Sensor Trigger', description: 'Sistem mendeteksi Current Stock <= Reorder Threshold pada SKU tertentu.', tool: 'Inventory Database', icon: '📦' },
      { step: 2, title: 'Optimal Reorder Calculation', description: 'AI menghitung jumlah pemesanan optimal (Max Stock - Current Stock).', tool: 'AI Logic Agent', icon: '🔢' },
      { step: 3, title: 'Best Vendor Selection', description: 'Mencocokkan harga kontrak terendah dengan lead time tercepat.', tool: 'Vendor Database', icon: '🏢' },
      { step: 4, title: 'Auto-Draft Purchase Order', description: 'Menyusun dokumen PO lengkap dengan nomor PO, termin pembayaran, dan itemized list.', tool: 'PDF / PO Generator', icon: '📋' },
      { step: 5, title: 'Manager 1-Click Approval', description: 'Manajer purchasing menerima draft di ponsel dan mengonfirmasi pemesanan 1-klik.', tool: 'Mobile Approval App', icon: '✅' },
    ],
  },
];

export default function FrameworkDiagrams() {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>(DIAGRAMS[0].id);

  const currentDiagram = DIAGRAMS.find((d) => d.id === selectedDiagramId) || DIAGRAMS[0];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Visual Architecture Blueprint
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            4 Alur Kerja Arsitektur Bisnis AI
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Peta visual bagaimana menghubungkan model AI, sensor hardware, dan alur kerja operasional perusahaan.
          </p>
        </div>

        {/* Selector Tabs (Mobile Scroll) */}
        <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1">
          {DIAGRAMS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiagramId(d.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                selectedDiagramId === d.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {d.title.split('(')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Diagram Info */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{currentDiagram.title}</span>
          <span className="text-slate-400">• Arsitek: {currentDiagram.speaker}</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300">{currentDiagram.subtitle}</p>
      </div>

      {/* Visual Nodes Flow (1 col on mobile, 5 cols on desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {currentDiagram.nodes.map((node, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-between space-y-3 relative group hover:border-indigo-500/50 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                  {node.step}
                </span>
                <span className="text-xl">{node.icon}</span>
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                {node.title}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {node.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 font-semibold block truncate text-center">
                {node.tool}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
