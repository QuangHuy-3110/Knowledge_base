import { X, FileText, Presentation, FileSpreadsheet, File, LayoutTemplate, Library, GraduationCap, ClipboardList, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { TemplateSelector } from './TemplateSelector';

interface CreateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDocument: (name: string, type: 'word' | 'powerpoint' | 'excel' | 'pdf', folderId: string, template?: string) => void;
  folders: { id: string; name: string }[];
}

export function CreateDocumentModal({ isOpen, onClose, onCreateDocument, folders }: CreateDocumentModalProps) {
  const [documentName, setDocumentName] = useState('');
  const [selectedType, setSelectedType] = useState<'word' | 'powerpoint' | 'excel' | 'pdf'>('word');
  const [selectedFolderId, setSelectedFolderId] = useState<string>(folders[0]?.id || 'root');
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: string; name: string } | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerCategory, setPickerCategory] = useState<string>('');

  if (!isOpen) return null;

  const documentTypes = [
    { id: 'word' as const, name: 'Tài liệu văn bản', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'powerpoint' as const, name: 'Trình chiếu', icon: Presentation, color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'excel' as const, name: 'Bảng tính', icon: FileSpreadsheet, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'pdf' as const, name: 'PDF', icon: File, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  const categories = [
    { id: 'lesson-plan', name: 'Mẫu giáo án', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { id: 'lecture', name: 'Mẫu bài giảng', icon: LayoutTemplate, color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'activity', name: 'Mẫu HĐTN', icon: ClipboardList, color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'library', name: 'Từ thư viện', icon: Library, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (documentName.trim()) {
      onCreateDocument(documentName, selectedType, selectedFolderId, selectedTemplate?.id || 'blank');
      setDocumentName('');
      setSelectedType('word');
      setSelectedTemplate(null);
      onClose();
    }
  };

  const handleOpenPicker = (category: string) => {
    setPickerCategory(category);
    setIsPickerOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-2xl p-6 w-full max-w-2xl border border-border shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold">Tạo tài liệu mới</h3>
              <p className="text-sm text-muted-foreground">Bắt đầu công việc của bạn với các mẫu có sẵn</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Tên tài liệu</label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Ví dụ: Kế hoạch giáo án tuần 12..."
                className="w-full px-4 py-3 bg-muted/30 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                autoFocus
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Lưu vào thư mục</label>
              <select
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
                className="w-full px-4 py-3 bg-muted/30 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              >
                <option value="root">Thư mục gốc (Workspace)</option>
                {folders.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-3 text-sm font-medium">1. Chọn định dạng</label>
              <div className="grid grid-cols-4 gap-3">
                {documentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSelectedType(type.id);
                        setSelectedTemplate(null);
                      }}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedType === type.id
                          ? 'border-primary bg-primary/5 shadow-inner'
                          : 'border-border hover:border-primary/30 hover:bg-accent/30'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${type.bg}`}>
                        <Icon className={`w-5 h-5 ${type.color}`} />
                      </div>
                      <span className="text-xs font-medium">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedType === 'word' && (
              <div>
                <label className="block mb-3 text-sm font-medium">2. Chọn mẫu tài liệu</label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleOpenPicker(cat.id)}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${cat.bg}`}>
                            <Icon className={`w-5 h-5 ${cat.color}`} />
                          </div>
                          <span className="font-medium text-sm">{cat.name}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
                
                {selectedTemplate && (
                  <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary text-primary-foreground rounded-md">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium italic">Đã chọn: {selectedTemplate.name}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setSelectedTemplate(null)}
                      className="text-xs text-primary hover:underline"
                    >
                      Thay đổi
                    </button>
                  </div>
                )}
                
                {!selectedTemplate && (
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate({ id: 'blank', name: 'Tài liệu trống' })}
                    className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors italic underline underline-offset-4"
                  >
                    Hoặc bắt đầu với tài liệu trống
                  </button>
                )}
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 text-sm font-bold bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                disabled={!documentName.trim()}
              >
                Tiếp tục tạo tài liệu
              </button>
            </div>
          </form>
        </div>
      </div>

      <TemplateSelector 
        isOpen={isPickerOpen}
        category={pickerCategory}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(template) => {
          setSelectedTemplate({ id: template.id, name: template.name });
          setIsPickerOpen(false);
        }}
      />
    </>
  );
}

