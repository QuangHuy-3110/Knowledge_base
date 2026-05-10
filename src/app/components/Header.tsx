import { Search, Bell, User } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-primary">Hệ Thống Quản Lý Tri Thức</h1>
            <nav className="hidden md:flex gap-6">
              {/* <a href="#" className="text-foreground hover:text-primary transition-colors">Trang chủ</a>
              {/* <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Bài giảng</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Giáo án</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Đề tài</a> */}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                className="pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring w-64"
              />
            </div>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
