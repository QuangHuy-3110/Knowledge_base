import { FileText, Download, Eye, MoreVertical, Send, Clock, Edit, Trash2 } from 'lucide-react';

interface CourseCardProps {
  title: string;
  type: 'lecture' | 'lesson-plan';
  category: string;
  date: string;
  fileSize: string;
  hasUploadPermission?: boolean;
  isWorkspace?: boolean;
  isPending?: boolean;
  onRequestPublish?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function CourseCard({ title, type, category, date, fileSize, hasUploadPermission = false, isWorkspace = false, isPending = false, onRequestPublish, onEdit, onDelete }: CourseCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-lg ${type === 'lecture' ? 'bg-blue-100' : 'bg-green-100'}`}>
            <FileText className={`w-6 h-6 ${type === 'lecture' ? 'text-blue-600' : 'text-green-600'}`} />
          </div>
          <div>
            <h3 className="mb-1">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className={`px-2 py-1 rounded ${type === 'lecture' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                {type === 'lecture' ? 'Bài giảng' : 'Giáo án'}
              </span>
              <span>•</span>
              <span className="truncate">{category}</span>
            </div>
          </div>
        </div>
        {hasUploadPermission && (
          <button className="p-1 hover:bg-accent rounded">
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-end text-sm text-muted-foreground mb-4">
        <span>{fileSize}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">{date}</span>
        <div className="flex items-center gap-2">
          {isWorkspace && onEdit && (
            <button
              onClick={onEdit}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="Chỉnh sửa"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Download className="w-4 h-4" />
          </button>
          {hasUploadPermission && onDelete && (
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 text-muted-foreground hover:text-red-600 rounded-lg transition-colors"
              title="Gỡ / Xóa bài"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {isWorkspace && !isPending && onRequestPublish && (
        <div className="mt-3 pt-3 border-t border-border">
          <button
            onClick={onRequestPublish}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-4 h-4" />
            Đề xuất công khai
          </button>
        </div>
      )}

      {isPending && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Đang chờ xét duyệt</span>
          </div>
        </div>
      )}
    </div>
  );
}
