import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-300">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md border border-destructive/20 shadow-2xl animate-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-destructive">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Xác nhận xóa</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Bạn có chắc chắn muốn gỡ hoặc xóa tài liệu <span className="font-bold text-foreground">"{title}"</span>? 
            Hành động này không thể hoàn tác.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2.5 border border-border rounded-xl hover:bg-accent font-medium transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-6 py-2.5 bg-destructive text-destructive-foreground rounded-xl hover:bg-destructive/90 font-bold shadow-lg shadow-destructive/20 transition-all"
          >
            Xác nhận xóa
          </button>
        </div>
      </div>
    </div>
  );
}
