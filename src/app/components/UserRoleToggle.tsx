import { ShieldCheck, Eye } from 'lucide-react';

interface UserRoleToggleProps {
  hasUploadPermission: boolean;
  onToggle: () => void;
}

export function UserRoleToggle({ hasUploadPermission, onToggle }: UserRoleToggleProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        {hasUploadPermission ? (
          <>
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-foreground">Quản trị viên</span>
          </>
        ) : (
          <>
            <Eye className="w-4 h-4 text-blue-600" />
            <span className="text-foreground">Người xem</span>
          </>
        )}
      </div>
      <button
        onClick={onToggle}
        className="ml-auto px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
      >
        Đổi vai trò (Demo)
      </button>
    </div>
  );
}
