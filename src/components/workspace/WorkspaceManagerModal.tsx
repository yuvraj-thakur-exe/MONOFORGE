'use client';

import React, { useState, useEffect } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { getWorkspace, ProjectProfile, SavedTemplate, ExportedAssetRecord } from '#/lib/workspace/workspace-store';
import {
  X,
  FolderKanban,
  Plus,
  Copy,
  Trash2,
  CheckCircle2,
  Calendar,
  Layers,
  Bookmark,
  History,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface WorkspaceManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkspaceManagerModal: React.FC<WorkspaceManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const currentConfig = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [activeTab, setActiveTab] = useState<'projects' | 'templates' | 'history'>('projects');
  const [projects, setProjects] = useState<ProjectProfile[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string>('');
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [exportHistory, setExportHistory] = useState<ExportedAssetRecord[]>([]);

  // Form states
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectVariant, setNewProjectVariant] = useState('work');
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateDesc, setNewTemplateDesc] = useState('');

  const refreshWorkspace = () => {
    const ws = getWorkspace();
    const data = ws.getData();
    setProjects(data.projects);
    setActiveProjectId(data.activeProjectId);
    setSavedTemplates(data.savedTemplates);
    setExportHistory(data.exportHistory);
  };

  useEffect(() => {
    if (isOpen) {
      refreshWorkspace();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreateProject = () => {
    const name = newProjectName.trim();
    if (!name) {
      toast.error('Please enter a project name');
      return;
    }

    const ws = getWorkspace();
    const created = ws.createProject(name, currentConfig, newProjectVariant);
    setEntireConfig(created.config);
    setNewProjectName('');
    refreshWorkspace();
    toast.success(`Created and switched to project "${created.name}"`);

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffe600', '#18181b'],
    });
  };

  const handleSwitchProject = (project: ProjectProfile) => {
    const ws = getWorkspace();
    // Save current config to current active project first
    ws.updateProjectConfig(activeProjectId, currentConfig);
    // Switch to new project
    ws.switchProject(project.id);
    setEntireConfig(project.config);
    refreshWorkspace();
    toast.success(`Switched active workspace to "${project.name}"`);
    onClose();
  };

  const handleDuplicateProject = (projectId: string) => {
    const ws = getWorkspace();
    const cloned = ws.duplicateProject(projectId);
    if (cloned) {
      refreshWorkspace();
      toast.success(`Duplicated variant "${cloned.name}"`);
    }
  };

  const handleDeleteProject = (projectId: string, name: string) => {
    const ws = getWorkspace();
    if (ws.getData().projects.length <= 1) {
      toast.error('Cannot delete the only project in your workspace');
      return;
    }

    if (confirm(`Delete project "${name}"? This cannot be undone.`)) {
      ws.deleteProject(projectId);
      refreshWorkspace();
      toast.info(`Deleted project "${name}"`);
    }
  };

  const handleSaveAsTemplate = () => {
    const name = newTemplateName.trim();
    if (!name) {
      toast.error('Please enter a template name');
      return;
    }

    const ws = getWorkspace();
    ws.saveCustomTemplate(name, newTemplateDesc, currentConfig);
    setNewTemplateName('');
    setNewTemplateDesc('');
    refreshWorkspace();
    toast.success(`Saved profile as custom template "${name}"`);
  };

  const handleApplyTemplate = (tpl: SavedTemplate) => {
    if (confirm(`Apply template "${tpl.name}"? Current unsaved work will be replaced.`)) {
      setEntireConfig(tpl.config);
      toast.success(`Applied template "${tpl.name}" to studio`);
      onClose();
    }
  };

  const handleDeleteTemplate = (id: string, name: string) => {
    const ws = getWorkspace();
    ws.deleteCustomTemplate(id);
    refreshWorkspace();
    toast.info(`Deleted template "${name}"`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl bg-white border-2 border-neutral-900 rounded-2xl shadow-[8px_8px_0px_#18181b] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight font-mono uppercase">
                  Developer Profile Workspace
                </h2>
                <span className="px-2 py-0.5 rounded bg-neutral-950 text-[#ffe600] text-[10px] font-mono font-bold">
                  LOCAL-FIRST
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Multiple Projects &bull; Profile Variants &bull; Zero Cloud Lock-In
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

        {/* Tabs */}
        <div className="flex items-center px-5 py-2 bg-white border-b-2 border-neutral-900 gap-1 overflow-x-auto text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Projects ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Saved Templates ({savedTemplates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-2xs'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Export History ({exportHistory.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 bg-[#fafafa] font-mono text-xs">
          {/* TAB 1: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              {/* New Project Creator */}
              <div className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
                <span className="font-bold text-neutral-900 text-xs">Create New Profile Project:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={e => setNewProjectName(e.target.value)}
                    placeholder="e.g. Open Source Maintainer Profile"
                    className="flex-1 px-3 py-1.5 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950 placeholder:text-neutral-400 focus:outline-none focus:bg-white"
                  />
                  <select
                    value={newProjectVariant}
                    onChange={e => setNewProjectVariant(e.target.value)}
                    className="px-3 py-1.5 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950"
                  >
                    <option value="main">Main Profile</option>
                    <option value="work">Enterprise / Work</option>
                    <option value="oss">Open Source</option>
                    <option value="minimal">Minimalist</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleCreateProject}
                    className="px-3.5 py-1.5 bg-[#ffe600] text-neutral-950 text-xs font-black border-2 border-neutral-900 rounded-lg shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>CREATE</span>
                  </button>
                </div>
              </div>

              {/* Project Cards List */}
              <div className="space-y-2.5">
                {projects.map(project => {
                  const isActive = project.id === activeProjectId;
                  return (
                    <div
                      key={project.id}
                      className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-amber-50/50 border-neutral-900 shadow-[3px_3px_0px_#18181b] ring-2 ring-[#ffe600]'
                          : 'bg-white border-neutral-900 shadow-[2px_2px_0px_#18181b]'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-xs text-neutral-950 truncate">
                            {project.name}
                          </h4>
                          {isActive && (
                            <span className="px-2 py-0.2 rounded bg-neutral-950 text-[#ffe600] text-[9px] font-black uppercase">
                              Active Project
                            </span>
                          )}
                          {project.variantLabel && (
                            <span className="px-1.5 py-0.2 rounded bg-neutral-100 border border-neutral-300 text-[9px] uppercase font-bold text-neutral-700">
                              {project.variantLabel}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Updated: {new Date(project.updatedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {project.config.sections?.length || 0} sections
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {!isActive ? (
                          <button
                            type="button"
                            onClick={() => handleSwitchProject(project)}
                            className="px-3 py-1.5 bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 rounded-lg shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer"
                          >
                            SWITCH
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 px-2 py-1">
                            <CheckCircle2 className="w-4 h-4" /> Open
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDuplicateProject(project.id)}
                          className="p-1.5 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-800 hover:bg-neutral-200 cursor-pointer"
                          title="Duplicate variant"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {projects.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(project.id, project.name)}
                            className="p-1.5 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-400 hover:text-red-600 cursor-pointer"
                            title="Delete project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SAVED TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              {/* Save current state as template */}
              <div className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] space-y-2">
                <span className="font-bold text-neutral-900 text-xs">Save Current Profile as Template Preset:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newTemplateName}
                    onChange={e => setNewTemplateName(e.target.value)}
                    placeholder="Template Name (e.g. My SRE Layout)"
                    className="flex-1 px-3 py-1.5 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950"
                  />
                  <input
                    type="text"
                    value={newTemplateDesc}
                    onChange={e => setNewTemplateDesc(e.target.value)}
                    placeholder="Short Description"
                    className="flex-1 px-3 py-1.5 bg-neutral-50 border-2 border-neutral-900 rounded-lg text-xs font-mono text-neutral-950"
                  />
                  <button
                    type="button"
                    onClick={handleSaveAsTemplate}
                    className="px-3.5 py-1.5 bg-[#ffe600] text-neutral-950 text-xs font-black border-2 border-neutral-900 rounded-lg shadow-2xs hover:bg-[#ffdf00] transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>SAVE</span>
                  </button>
                </div>
              </div>

              {savedTemplates.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border-2 border-dashed border-neutral-300 text-xs text-neutral-500">
                  No custom saved templates yet. Save your current profile design as a reusable archetype above!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {savedTemplates.map(tpl => (
                    <div
                      key={tpl.id}
                      className="p-3.5 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-black text-xs text-neutral-950">{tpl.name}</h4>
                        <p className="text-[11px] text-neutral-600">{tpl.description}</p>
                        <span className="text-[10px] text-neutral-400">
                          Saved: {new Date(tpl.createdAt).toLocaleDateString()} &bull; {tpl.config.sections?.length || 0} modules
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleApplyTemplate(tpl)}
                          className="px-3 py-1.5 bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 rounded-lg shadow-2xs hover:bg-[#ffdf00] cursor-pointer"
                        >
                          APPLY
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTemplate(tpl.id, tpl.name)}
                          className="p-1.5 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: EXPORT HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {exportHistory.length === 0 ? (
                <div className="p-8 text-center bg-white rounded-xl border-2 border-dashed border-neutral-300 text-xs text-neutral-500">
                  <History className="w-5 h-5 mx-auto mb-2 text-neutral-400" />
                  No export history recorded yet. Files exported or copied in the studio will be logged here.
                </div>
              ) : (
                <div className="space-y-2">
                  {exportHistory.map(item => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-xl border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-neutral-950 text-[#ffe600] font-black uppercase text-[10px]">
                          {item.format}
                        </span>
                        <span className="font-bold text-neutral-950">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                        <span>{item.byteSize} bytes</span>
                        <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-t-2 border-neutral-900 text-xs font-mono">
          <span className="text-neutral-500 text-[11px]">
            Workspace state persisted in your browser local storage
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-950 text-white font-bold border-2 border-neutral-900 hover:bg-neutral-800 transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceManagerModal;
