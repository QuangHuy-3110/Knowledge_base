import { X, Folder } from 'lucide-react';
import { useState } from 'react';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (name: string, parentId: string) => void;
  parentFolders: Array<{ id: string; name: string }>;
}

export function CreateFolderModal({ isOpen, onClose, onCreateFolder, parentFolders }: CreateFolderModalProps) {
  const [folderName, setFolderName] = useState('');
  const [selectedParent, setSelectedParent] = useState('root');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreateFolder(folderName, selectedParent);
      setFolderName('');
      setSelectedParent('root');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-xl p-6 w-full max-w-md border border-border">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            <h3>Tạo thư mục mới</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-accent rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Tên thư mục</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Nhập tên thư mục..."
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm">Thư mục cha</label>
            <select
              value={selectedParent}
              onChange={(e) => setSelectedParent(e.target.value)}
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="root">Thư mục gốc</option>
              {parentFolders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              disabled={!folderName.trim()}
            >
              Tạo thư mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
