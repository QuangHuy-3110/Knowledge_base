import { X, Search, FileText, Check } from 'lucide-react';
import { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
  category: string;
}

export function TemplateSelector({ isOpen, onClose, onSelect, category }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const allTemplates: Template[] = [
    { id: 'lesson-plan-1', name: 'Giáo án HĐTN Lớp 10 - HK1', description: 'Mẫu chuẩn 2024 cho lớp 10', category: 'lesson-plan' },
    { id: 'lesson-plan-2', name: 'Giáo án Hướng nghiệp Lớp 11', description: 'Định hướng nghề nghiệp sớm', category: 'lesson-plan' },
    { id: 'lesson-plan-3', name: 'Giáo án Kỹ năng sống 12', description: 'Chuẩn bị hành trang vào đời', category: 'lesson-plan' },
    { id: 'lecture-1', name: 'Bài giảng: Kỷ nguyên AI', description: 'Tổng quan về trí tuệ nhân tạo', category: 'lecture' },
    { id: 'lecture-2', name: 'Bài giảng: Kỹ năng mềm', description: 'Giao tiếp và làm việc nhóm', category: 'lecture' },
    { id: 'activity-1', name: 'Hoạt động: Tham quan bảo tàng', description: 'Kế hoạch chi tiết đi thực tế', category: 'activity' },
    { id: 'activity-2', name: 'Hoạt động: Hội chợ khởi nghiệp', description: 'Thực hành kinh doanh giả định', category: 'activity' },
    { id: 'lib-1', name: 'Thư viện: Kỹ năng sống 10.docx', description: 'File gốc từ kho dữ liệu', category: 'library' },
    { id: 'lib-2', name: 'Thư viện: Hướng nghiệp 11.docx', description: 'File gốc từ kho dữ liệu', category: 'library' },
  ];

  const filteredTemplates = allTemplates.filter(t => 
    t.category === category && 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'lesson-plan': return 'Kho Giáo Án';
      case 'lecture': return 'Kho Bài Giảng';
      case 'activity': return 'Hoạt Động Trải Nghiệm';
      case 'library': return 'Thư Viện Hệ Thống';
      default: return 'Danh Sách Mẫu';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-card rounded-2xl w-full max-w-2xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/20">
          <div>
            <h3 className="font-semibold">{getCategoryName(category)}</h3>
            <p className="text-xs text-muted-foreground">Chọn một mẫu để tiếp tục</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 max-h-[400px]">
          <div className="grid grid-cols-1 gap-2">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSelect(template)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">{template.description}</div>
                  </div>
                  <Check className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Không tìm thấy mẫu nào trong thư mục này.
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-muted/10 border-t border-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-xl hover:bg-accent transition-all"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
