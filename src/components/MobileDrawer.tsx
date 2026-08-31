import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  Video, 
  BookMarked, 
  Layers, 
  FileText, 
  Calculator, 
  Wrench, 
  Target, 
  HelpCircle,
  Zap,
  Compass,
  Award,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleOpenDrawer = () => setIsOpen(true);
    window.addEventListener('openMobileDrawer', handleOpenDrawer);
    return () => window.removeEventListener('openMobileDrawer', handleOpenDrawer);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const groups = [
    {
      groupName: 'Akselerator Belajar',
      items: [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard, badge: 'Home' },
        { name: 'Contekkan 3 Menit', href: '/cheatsheet', icon: Zap, badge: 'Quick' },
        { name: 'Jalur Belajar Peran', href: '/pathways', icon: Compass, badge: 'Role' },
        { name: 'Tes Kematangan AI', href: '/quiz', icon: Award, badge: 'Kuis' },
      ],
    },
    {
      groupName: 'Kurikulum & Materi',
      items: [
        { name: 'Kurikulum & Video Sync', href: '/curriculum', icon: Video, badge: '12+ Jam' },
        { name: 'Kamus Istilah Awam', href: '/glossary', icon: BookMarked, badge: 'A-Z' },
        { name: 'Arsitektur Sistem', href: '/architecture', icon: Layers, badge: '4 Alur' },
      ],
    },
    {
      groupName: 'Tools & Eksekusi',
      items: [
        { name: 'Prompt Vault', href: '/prompts', icon: FileText, badge: '8 Prompt' },
        { name: 'CEO Simulator', href: '/simulator', icon: Calculator, badge: 'ROI Calc' },
        { name: 'AI Tools Directory', href: '/tools', icon: Wrench, badge: '8 Tools' },
        { name: '30-60-90 Roadmap', href: '/roadmap', icon: Target, badge: 'Action' },
        { name: 'Executive FAQ', href: '/faq', icon: HelpCircle, badge: 'Q&A' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Trigger Button (Hamburger) */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Buka Menu Navigasi"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Drawer Overlay & Content */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200 border-r border-slate-200 dark:border-slate-800">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">SEKOLAH CEO AI</div>
                  <div className="text-[10px] text-slate-400">Executive Hub 2026</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Groups (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {groups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2">
                    {group.groupName}
                  </div>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            active
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                            <span className="truncate">{item.name}</span>
                          </div>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                            {item.badge}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Info */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span>12 Modul Siap Akses</span>
                <span className="font-mono text-emerald-500 font-bold">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
