import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, Trash2 } from 'lucide-react';
import { useState } from 'react';

export interface TreeNodeData {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNodeData[];
  fileCount?: number;
}

interface TreeNodeProps {
  node: TreeNodeData;
  level?: number;
  onSelect?: (node: TreeNodeData) => void;
  onDelete?: (nodeId: string, nodeName: string) => void;
  selectedId?: string;
}

export function TreeNode({ node, level = 0, onSelect, onDelete, selectedId }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(node);
    }
  };

  const isSelected = selectedId === node.id;

  return (
    <div>
      <button
        onClick={() => {
          handleToggle();
          handleSelect();
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left group ${
          isSelected ? 'bg-accent' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {node.type === 'folder' && (
          <span className="flex-shrink-0">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </span>
        )}
        {node.type === 'file' && <span className="w-4 flex-shrink-0" />}

        {node.type === 'folder' ? (
          isExpanded ? (
            <FolderOpen className="w-4 h-4 text-primary flex-shrink-0" />
          ) : (
            <Folder className="w-4 h-4 text-primary flex-shrink-0" />
          )
        ) : (
          <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}

        <span className="flex-1 truncate text-foreground">{node.name}</span>

        {node.type === 'folder' && node.fileCount !== undefined && (
          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded flex-shrink-0 group-hover:hidden">
            {node.fileCount}
          </span>
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node.id, node.name);
            }}
            className="p-1 hover:bg-red-100 text-muted-foreground hover:text-red-600 rounded opacity-0 group-hover:opacity-100 transition-all"
            title="Xóa"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </button>

      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              onDelete={onDelete}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
