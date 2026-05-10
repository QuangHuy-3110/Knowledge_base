import { Home, Library, CheckSquare, Users } from 'lucide-react';

type ViewMode = 'workspace' | 'public-library' | 'approvals' | 'templates-library' | 'user-management';

interface TabNavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  hasUploadPermission: boolean;
  pendingCount?: number;
}

export function TabNavigation({ currentView, onViewChange, hasUploadPermission, pendingCount = 0 }: TabNavigationProps) {
  const tabs = [
    { id: 'workspace' as ViewMode, label: 'Workspace', icon: Home },
    { id: 'public-library' as ViewMode, label: 'Thư viện công khai', icon: Library },
  ];

  if (hasUploadPermission) {
    tabs.push({
      id: 'approvals' as ViewMode,
      label: 'Xét duyệt',
      icon: CheckSquare,
    });
    tabs.push({
      id: 'templates-library' as ViewMode,
      label: 'Kho tài liệu mẫu',
      icon: Library,
    });
    tabs.push({
      id: 'user-management' as ViewMode,
      label: 'Quản lý người dùng',
      icon: Users,
    });
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="flex gap-1 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors relative ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.id === 'approvals' && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
