import { BookOpen, FolderPlus } from 'lucide-react';
import { TreeNode, TreeNodeData } from './TreeNode';
import { useState } from 'react';

interface SidebarProps {
  onNodeSelect?: (node: TreeNodeData) => void;
  onDeleteNode?: (nodeId: string, nodeName: string) => void;
  viewMode: 'workspace' | 'public-library';
  onCreateFolder?: () => void;
  workspaceStructure?: TreeNodeData[];
  publicStructure?: TreeNodeData[];
}

export function Sidebar({ onNodeSelect, onDeleteNode, viewMode, onCreateFolder, workspaceStructure, publicStructure }: SidebarProps) {
  const [selectedId, setSelectedId] = useState<string>('');

  const handleNodeSelect = (node: TreeNodeData) => {
    setSelectedId(node.id);
    if (onNodeSelect) {
      onNodeSelect(node);
    }
  };

  const getTitle = () => {
    switch (viewMode) {
      case 'workspace':
        return 'Workspace cá nhân';
      case 'public-library':
        return 'Thư viện công khai';
      default:
        return 'Tài liệu';
    }
  };

  const getDescription = () => {
    switch (viewMode) {
      case 'workspace':
        return 'Quản lý tài liệu cá nhân của bạn';
      case 'public-library':
        return 'Tài liệu đã được phê duyệt';
      default:
        return '';
    }
  };

  const currentStructure = viewMode === 'workspace' 
    ? (workspaceStructure || [])
    : (publicStructure || []);

  return (
    <aside className="w-80 bg-card border-r border-border flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-border bg-muted/5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-bold">{getTitle()}</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          {getDescription()}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="space-y-1">
          {currentStructure.length > 0 ? (
            currentStructure.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                onSelect={handleNodeSelect}
                onDelete={onDeleteNode}
                selectedId={selectedId}
              />
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm italic">
              Trống
            </div>
          )}
        </div>
      </div>

      {onCreateFolder && (
        <div className="p-4 border-t border-border bg-muted/5">
          <button
            onClick={onCreateFolder}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all font-bold text-sm ${
              viewMode === 'public-library' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-200'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-primary/20'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            {viewMode === 'public-library' ? 'Tạo thư mục thư viện' : 'Tạo thư mục cá nhân'}
          </button>
        </div>
      )}
    </aside>
  );
}
