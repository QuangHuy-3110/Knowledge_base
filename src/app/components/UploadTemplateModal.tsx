import { X, Upload, FileText, LayoutTemplate, ClipboardList, GraduationCap } from 'lucide-react';
import { useState } from 'react';

interface UploadTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (template: any) => void;
}

export function UploadTemplateModal({ isOpen, onClose, onUpload }: UploadTemplateModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('lesson-plan');
  const [file, setFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && file) {
      onUpload({
        id: `t-${Date.now()}`,
        title: name,
        type: type,
        category: type === 'lesson-plan' ? 'Giáo án' : type === 'lecture' ? 'Bài giảng' : 'Hoạt động',
        date: new Date().toLocaleDateString('vi-VN'),
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
      onClose();
      setName('');
      setType('lesson-plan');
      setFile(null);
    }
  };

  const types = [
    { id: 'lesson-plan', name: 'Giáo án', icon: GraduationCap },
    { id: 'lecture', name: 'Bài giảng', icon: LayoutTemplate },
    { id: 'activity', name: 'Hoạt động trải nghiệm', icon: ClipboardList },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-lg border border-border shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Tải lên tài liệu mẫu</h3>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Tên tài liệu mẫu</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên tài liệu mẫu..."
              className="w-full px-4 py-2 bg-muted/30 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium">Loại tài liệu mẫu</label>
            <div className="grid grid-cols-1 gap-2">
              {types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    type === t.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-accent'
                  }`}
                >
                  <t.icon className={`w-5 h-5 ${type === t.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Chọn file tài liệu</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                accept=".doc,.docx,.pdf,.ppt,.pptx"
                required
              />
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {file ? file.name : 'Kéo thả hoặc nhấn để chọn file (Word, PowerPoint, PDF)'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-xl hover:bg-accent"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-bold"
              disabled={!name || !file}
            >
              Tải lên ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
