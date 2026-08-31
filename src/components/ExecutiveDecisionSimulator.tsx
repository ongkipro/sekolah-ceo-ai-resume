import React, { useState, useMemo } from 'react';
import { Cpu, User, Sparkles, Calculator } from 'lucide-react';

interface RolePreset {
  id: string;
  roleName: string;
  department: string;
  baseSalary: number; // in IDR
  tasks: Array<{
    name: string;
    type: 'ai' | 'hybrid' | 'human';
    hoursPerWeek: number;
    toolRecommended: string;
    description: string;
  }>;
}

const PRESETS: RolePreset[] = [
  {
    id: 'finance-audit',
    roleName: 'Senior Finance & Internal Auditor',
    department: 'Finance & Accounting',
    baseSalary: 15000000,
    tasks: [
      { name: 'Rekonsiliasi Bank & Cek Anomali Transaksi', type: 'ai', hoursPerWeek: 12, toolRecommended: 'Claude Desktop / Excel Script', description: 'AI memindai 12 bulan ledger dan mendeteksi anomali fraud.' },
      { name: 'Pembuatan Draf Memo Audit Resmi (.docx)', type: 'ai', hoursPerWeek: 8, toolRecommended: 'Claude B.R.I.E.F. Prompt', description: 'Auto-generate memo resmi lengkap dengan nomor surat & tabel.' },
      { name: 'Analisis Kelayakan Finansial & Proyeksi Cash Flow', type: 'hybrid', hoursPerWeek: 10, toolRecommended: 'Claude Projects + Sheets', description: 'AI membuat skenario proyeksi, manusia memvalidasi asumsi bisnis.' },
      { name: 'Investigasi Forensik Lapangan & Wawancara Fraud', type: 'human', hoursPerWeek: 6, toolRecommended: 'Human Judgment', description: 'Empati psikologis dan pembuktian fisik yang tidak bisa digantikan AI.' },
      { name: 'Keputusan Rekomendasi Sanksi Dewan Direksi', type: 'human', hoursPerWeek: 4, toolRecommended: 'Executive Board', description: 'Tanggung jawab legal dan etika final.' },
    ],
  },
  {
    id: 'marketing-content',
    roleName: 'Content Creator & Growth Lead',
    department: 'Marketing',
    baseSalary: 10000000,
    tasks: [
      { name: 'Riset Ide & Skrip Konten Viral', type: 'ai', hoursPerWeek: 10, toolRecommended: 'Claude / Perplexity', description: 'Mencari angle trending dan menyusun hook psikologis.' },
      { name: 'Produksi Jingle & Sound Branding', type: 'ai', hoursPerWeek: 6, toolRecommended: 'Suno AI', description: 'Pembuatan audio komersial kualitas studio dalam 30 detik.' },
      { name: 'Video Presenter & Avatar Scaling', type: 'ai', hoursPerWeek: 12, toolRecommended: 'HeyGen / Kling AI', description: 'Memproduksi video edukasi dan iklan tanpa studio fisik.' },
      { name: 'Otomasi Follow-up Leads Comment-to-DM', type: 'ai', hoursPerWeek: 8, toolRecommended: 'ManyChat', description: 'Auto-distribusi PDF penawaran ke ribuan komentar.' },
      { name: 'Penetapan Brand Narrative & Partnership Strategis', type: 'human', hoursPerWeek: 4, toolRecommended: 'Founder & Head of Mktg', description: 'Menjaga positioning brand jangka panjang.' },
    ],
  },
  {
    id: 'sales-ops',
    roleName: 'Senior Sales Representative & CS',
    department: 'Sales',
    baseSalary: 12000000,
    tasks: [
      { name: 'Menjawab Pertanyaan Dasar & FAQ Pelanggan', type: 'ai', hoursPerWeek: 15, toolRecommended: 'Pekerja.AI Bot / ManyChat', description: 'Menangani ribuan chat repetitif 24/7 tanpa delay.' },
      { name: 'Objection Handling Standard ("Kemahalan", dll.)', type: 'ai', hoursPerWeek: 10, toolRecommended: 'Cloned Top-Sales AI Prompt', description: 'Menggunakan skrip closing sales terbaik nomor 1.' },
      { name: 'Kualifikasi Klien High-Ticket B2B', type: 'hybrid', hoursPerWeek: 8, toolRecommended: 'CRM + AI Scoring', description: 'AI menyortir ICP, sales senior menjadwalkan meeting.' },
      { name: 'Negosiasi Tatap Muka & Closing Kontrak Bernilai Besar', type: 'human', hoursPerWeek: 7, toolRecommended: 'Top Sales Executive', description: 'Membangun trust dan chemistry interpersonal.' },
    ],
  },
  {
    id: 'procurement-ops',
    roleName: 'Purchasing & Inventory Officer',
    department: 'Operations',
    baseSalary: 8000000,
    tasks: [
      { name: 'Pemantauan Batas Minimum Stok Gudang', type: 'ai', hoursPerWeek: 8, toolRecommended: 'N8N + Warehouse Sensor', description: 'Sensor memicu alert otomatis saat stok menipis.' },
      { name: 'Penyusunan Draf Purchase Order (PO)', type: 'ai', hoursPerWeek: 12, toolRecommended: 'Auto-PO Prompt', description: 'Menghitung kuantitas reorder dan memilih vendor terbaik.' },
      { name: 'Approval Final & Relasi Vendor Strategis', type: 'human', hoursPerWeek: 8, toolRecommended: 'Purchasing Manager', description: 'One-click approval dan negosiasi diskon volume besar.' },
      { name: 'Inspeksi Fisik Mutu Barang Tiba di Gudang', type: 'human', hoursPerWeek: 12, toolRecommended: 'Gudang Quality Control', description: 'Pemeriksaan fisik langsung terhadap cacat barang.' },
    ],
  },
];

export default function ExecutiveDecisionSimulator() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESETS[0].id);

  const currentRole = PRESETS.find((r) => r.id === selectedPresetId) || PRESETS[0];

  // Calculations
  const stats = useMemo(() => {
    const totalHours = currentRole.tasks.reduce((sum, t) => sum + t.hoursPerWeek, 0);
    const aiHours = currentRole.tasks
      .filter((t) => t.type === 'ai')
      .reduce((sum, t) => sum + t.hoursPerWeek, 0);
    const hybridHours = currentRole.tasks
      .filter((t) => t.type === 'hybrid')
      .reduce((sum, t) => sum + t.hoursPerWeek, 0);
    const humanHours = currentRole.tasks
      .filter((t) => t.type === 'human')
      .reduce((sum, t) => sum + t.hoursPerWeek, 0);

    const automatedHours = aiHours + hybridHours * 0.5;
    const efficiencyPercent = Math.round((automatedHours / totalHours) * 100);
    const monthlyCostSaved = Math.round((currentRole.baseSalary * (efficiencyPercent / 100)));

    return {
      totalHours,
      aiHours,
      hybridHours,
      humanHours,
      efficiencyPercent,
      monthlyCostSaved,
    };
  }, [currentRole]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
              <Calculator className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
              Interactive CEO Decision Simulator
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Matriks Dekonstruksi Pekerjaan: AI vs Manusia
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            Simulasikan bagaimana dekonstruksi job deskripsi memangkas jam kerja repetitif dan menghemat biaya hingga {stats.efficiencyPercent}%.
          </p>
        </div>

        {/* Role Selector Tabs (Clean Grid on Mobile) */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 shrink-0">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedPresetId(preset.id)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all text-center cursor-pointer ${
                selectedPresetId === preset.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {preset.roleName.split('&')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Jam Repetitif Terpangkas</div>
          <div className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400 font-mono">
            {stats.aiHours} Jam / Mgg
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Dialihkan 100% ke Agen AI
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Tingkat Efisiensi Output</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +{stats.efficiencyPercent}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Beban kognitif staf berkurang drastis
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50 space-y-1">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">Estimasi Efisiensi Biaya</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
            Rp {(stats.monthlyCostSaved / 1000000).toFixed(1)} Jt/bln
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Dari gaji dasar Rp {(currentRole.baseSalary / 1000000).toFixed(0)} Jt/bln
          </div>
        </div>
      </div>

      {/* Micro-Tasks Breakdown Table */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Daftar Micro-Tasks Posisi:</span>
          <span className="text-slate-900 dark:text-white font-bold">{currentRole.roleName}</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          {currentRole.tasks.map((task, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{task.name}</span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 shrink-0">({task.hoursPerWeek} jam/mgg)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{task.description}</p>
                <div className="text-[11px] text-slate-400 font-mono pt-0.5">
                  Rekomendasi Tool: <span className="text-blue-600 dark:text-blue-400 font-bold">{task.toolRecommended}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 pt-1 sm:pt-0">
                {task.type === 'ai' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Cpu className="w-3.5 h-3.5" />
                    100% AI Automated
                  </span>
                )}
                {task.type === 'hybrid' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    Hybrid (AI + Human)
                  </span>
                )}
                {task.type === 'human' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <User className="w-3.5 h-3.5" />
                    100% Human Strategic
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
