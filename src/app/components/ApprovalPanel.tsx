import { CheckCircle, XCircle, Clock, FileText, User } from 'lucide-react';
import { useState } from 'react';

interface PendingDocument {
  id: string;
  title: string;
  type: 'lecture' | 'lesson-plan';
  category: string;
  submittedBy: string;
  submittedDate: string;
  fileSize: string;
}

interface ApprovalPanelProps {
  pendingDocuments: PendingDocument[];
  publicFolders: { id: string; name: string }[];
  onApprove: (id: string, folderId: string) => void;
  onReject: (id: string) => void;
}

export function ApprovalPanel({ pendingDocuments, publicFolders, onApprove, onReject }: ApprovalPanelProps) {
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');

  if (pendingDocuments.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 text-center animate-in fade-in duration-500">
        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="mb-2">Không có đề xuất nào</h3>
        <p className="text-muted-foreground">
          Chưa có tài liệu nào chờ xét duyệt
        </p>
      </div>
    );
  }

  const handleConfirmApprove = (id: string) => {
    if (selectedFolderId) {
      onApprove(id, selectedFolderId);
      setApprovingId(null);
      setSelectedFolderId('');
    } else {
      alert('Vui lòng chọn thư mục để công khai!');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold">Đề xuất chờ xét duyệt</h2>
          <p className="text-xs text-muted-foreground">Phê duyệt và phân loại tài liệu vào thư viện</p>
        </div>
        <span className="ml-auto bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
          {pendingDocuments.length}
        </span>
      </div>

      <div className="space-y-4">
        {pendingDocuments.map((doc) => (
          <div
            key={doc.id}
            className="border border-border rounded-xl p-5 hover:border-primary/30 transition-all bg-muted/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-4 rounded-xl shadow-sm ${doc.type === 'lecture' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  <FileText className={`w-6 h-6 ${doc.type === 'lecture' ? 'text-blue-600' : 'text-green-600'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold mb-1">{doc.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className={`px-2 py-0.5 rounded-full font-medium ${doc.type === 'lecture' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                      {doc.type === 'lecture' ? 'Bài giảng' : 'Giáo án'}
                    </span>
                    <span>•</span>
                    <span className="font-medium">{doc.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-background p-3 rounded-lg border border-border/50 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                  {doc.submittedBy.charAt(0)}
                </div>
                <span>Người gửi: <strong>{doc.submittedBy}</strong></span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span>Ngày gửi: {doc.submittedDate}</span>
                <span>|</span>
                <span>{doc.fileSize}</span>
              </div>
            </div>

            {approvingId === doc.id ? (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-4 animate-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-sm font-bold mb-2">Chọn thư mục để công khai:</label>
                  <select
                    value={selectedFolderId}
                    onChange={(e) => setSelectedFolderId(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">-- Chọn thư mục đích --</option>
                    {publicFolders.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleConfirmApprove(doc.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold transition-all"
                  >
                    Xác nhận phê duyệt
                  </button>
                  <button
                    onClick={() => setApprovingId(null)}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setApprovingId(doc.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-bold transition-all shadow-sm hover:shadow-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  Phê duyệt
                </button>
                <button
                  onClick={() => onReject(doc.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive hover:text-white font-medium transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  Từ chối
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
