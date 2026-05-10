import { Upload, FileText, BookOpen, FolderTree } from 'lucide-react';
import { useState } from 'react';

interface UploadSectionProps {
  hasUploadPermission: boolean;
}

export function UploadSection({ hasUploadPermission }: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload here
  };

  if (!hasUploadPermission) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>Tải Tài Liệu Mới</h2>
          <p className="text-muted-foreground mt-1">Tải lên tài liệu vào thư mục được chọn</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <FileText className="w-4 h-4" />
            Bài giảng
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
            <BookOpen className="w-4 h-4" />
            Giáo án
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm">Chọn thư mục đích</label>
        <div className="relative">
          <FolderTree className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">-- Chọn thư mục --</option>
            <option value="1-1-1">Hoạt động trải nghiệm / Nghề nghiệp / Giới thiệu các ngành nghề</option>
            <option value="1-1-2">Hoạt động trải nghiệm / Nghề nghiệp / Kỹ năng nghề nghiệp</option>
            <option value="1-1-3">Hoạt động trải nghiệm / Nghề nghiệp / Thực hành nghề nghiệp</option>
            <option value="1-2-1">Hoạt động trải nghiệm / Văn hóa - xã hội / Văn hóa dân tộc</option>
            <option value="1-2-2">Hoạt động trải nghiệm / Văn hóa - xã hội / Kỹ năng sống</option>
            <option value="1-3-1">Hoạt động trải nghiệm / Khoa học - công nghệ / Dự án khoa học</option>
            <option value="1-3-2">Hoạt động trải nghiệm / Khoa học - công nghệ / Công nghệ trong cuộc sống</option>
            <option value="2-1">Hướng nghiệp / Tư vấn hướng nghiệp</option>
            <option value="2-2">Hướng nghiệp / Thông tin tuyển sinh</option>
            <option value="2-3">Hướng nghiệp / Kỹ năng tìm việc</option>
          </select>
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          dragActive ? 'border-primary bg-accent' : 'border-border bg-background'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="mb-2">Kéo và thả tệp vào đây</h3>
        <p className="text-muted-foreground mb-4">hoặc</p>
        <label className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90 transition-colors">
          Chọn tệp
          <input type="file" className="hidden" multiple />
        </label>
        <p className="text-sm text-muted-foreground mt-4">
          Hỗ trợ: PDF, DOC, DOCX, PPT, PPTX (Tối đa 50MB)
        </p>
      </div>
    </div>
  );
}
