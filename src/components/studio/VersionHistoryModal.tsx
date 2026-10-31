'use client';

import React, { useState, useEffect } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfig } from '#/lib/plugins/types';
import {
  X,
  History,
  RotateCcw,
  Save,
  Trash2,
  Download,
  Calendar,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

interface SnapshotEntry {
  id: string;
  name: string;
  timestamp: number;
  config: ReadmeConfig;
}

interface VersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = '@monoforge-snapshots';

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const currentConfig = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [snapshots, setSnapshots] = useState<SnapshotEntry[]>([]);
  const [newSnapshotName, setNewSnapshotName] = useState('');

  // Load snapshots from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSnapshots(JSON.parse(stored));
        }
      } catch {
        // Fallback
      }
    }
  }, [isOpen]);

  const saveSnapshots = (updated: SnapshotEntry[]) => {
    setSnapshots(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleCreateSnapshot = () => {
    const name = newSnapshotName.trim() || `Snapshot #${snapshots.length + 1}`;
    const newEntry: SnapshotEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name,
      timestamp: Date.now(),
      config: currentConfig,
    };

    const next = [newEntry, ...snapshots];
    saveSnapshots(next);
    setNewSnapshotName('');
    toast.success(`Created snapshot "${name}"`);
  };

  const handleRestoreSnapshot = (entry: SnapshotEntry) => {
    if (confirm(`Restore snapshot "${entry.name}"? Current unsaved work will be replaced.`)) {
      setEntireConfig(entry.config);
      toast.success(`Restored "${entry.name}"`);
      onClose();
    }
  };

  const handleDeleteSnapshot = (id: string, name: string) => {
    const next = snapshots.filter(s => s.id !== id);
    saveSnapshots(next);
    toast.info(`Deleted "${name}"`);
  };

  const handleExportBackup = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(snapshots, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `monoforge-snapshots-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('Exported snapshots backup JSON');
    } catch {
      toast.error('Failed to export backup');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/65 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                Version History &amp; Snapshots
              </h2>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Local Rollback Points &bull; Zero Data Loss
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-900 transition-all hover:scale-105 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#fafafa]">
          {/* Create New Snapshot Bar */}
          <div className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
            <label className="block text-xs font-mono font-bold text-neutral-800">
              Save Current Studio State:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSnapshotName}
                onChange={e => setNewSnapshotName(e.target.value)}
                placeholder="e.g. Before changing to cyber theme"
                className="flex-1 px-3 py-1.5 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:bg-white"
                onKeyDown={e => e.key === 'Enter' && handleCreateSnapshot()}
              />
              <button
                type="button"
                onClick={handleCreateSnapshot}
                className="px-3.5 py-1.5 bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#18181b] hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>SAVE</span>
              </button>
            </div>
          </div>

          {/* Snapshot List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-600 px-1">
              <span className="font-bold uppercase tracking-wider">
                Saved Snapshots ({snapshots.length})
              </span>
              {snapshots.length > 0 && (
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="flex items-center gap-1 text-[11px] hover:text-neutral-950 font-bold underline cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Backup JSON</span>
                </button>
              )}
            </div>

            {snapshots.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border-2 border-dashed border-neutral-300 font-mono text-xs text-neutral-500 space-y-1">
                <p className="font-bold text-neutral-700">No saved snapshots yet.</p>
                <p>Create a snapshot above to save restore points while designing your profile.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {snapshots.map(entry => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] gap-2"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-mono text-xs font-bold text-neutral-950 truncate">
                        {entry.name}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {entry.config.sections?.length || 0} modules
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleRestoreSnapshot(entry)}
                        className="px-2.5 py-1 bg-[#ffe600] text-neutral-950 text-xs font-mono font-black border border-neutral-900 rounded-md shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center gap-1"
                        title="Restore this snapshot"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>RESTORE</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSnapshot(entry.id, entry.name)}
                        className="p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete snapshot"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            Persisted securely in your browser local storage
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-mono text-xs font-bold border-2 border-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default VersionHistoryModal;
