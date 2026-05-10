import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UploadSection } from './components/UploadSection';
import { CourseCard } from './components/CourseCard';
import { UserRoleToggle } from './components/UserRoleToggle';
import { TreeNodeData } from './components/TreeNode';
import { TabNavigation } from './components/TabNavigation';
import { CreateFolderModal } from './components/CreateFolderModal';
import { ApprovalPanel } from './components/ApprovalPanel';
import { CreateDocumentModal } from './components/CreateDocumentModal';
import { DocumentEditor } from './components/DocumentEditor';
import { FilePlus, Upload, Users, Shield, ShieldAlert, User as UserIcon, Trash2 } from 'lucide-react';
import { UploadTemplateModal } from './components/UploadTemplateModal';
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal';

type ViewMode = 'workspace' | 'public-library' | 'approvals' | 'templates-library' | 'user-management';

export default function App() {
  const [hasUploadPermission, setHasUploadPermission] = useState(true);
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [currentView, setCurrentView] = useState<ViewMode>('workspace');
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'editor'>('dashboard');
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [isCreateDocumentOpen, setIsCreateDocumentOpen] = useState(false);
  const [isUploadTemplateOpen, setIsUploadTemplateOpen] = useState(false);
  const [selectedTemplateCategory, setSelectedTemplateCategory] = useState<string>('all');
  const [selectedPublicCategory, setSelectedPublicCategory] = useState<string>('all');
  const [currentDocument, setCurrentDocument] = useState<{ title: string; type: 'word' | 'powerpoint'; content?: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; docId: string; title: string }>({
    isOpen: false,
    docId: '',
    title: ''
  });
  const [workspaceStructure, setWorkspaceStructure] = useState<TreeNodeData[]>([
    {
      id: 'w-1',
      name: 'Tài liệu của tôi',
      type: 'folder',
      fileCount: 12,
      children: [
        {
          id: 'w-1-1',
          name: 'Hoạt động trải nghiệm',
          type: 'folder',
          fileCount: 8,
          children: [
            { id: 'w-1-1-1', name: 'Bài giảng ngành IT.pdf', type: 'file' },
            { id: 'w-1-1-2', name: 'Kỹ năng giao tiếp.pptx', type: 'file' },
          ],
        },
        {
          id: 'w-1-2',
          name: 'Hướng nghiệp',
          type: 'folder',
          fileCount: 4,
        },
      ],
    },
  ]);

  const [pendingDocuments, setPendingDocuments] = useState([
    {
      id: 'pending-1',
      title: 'Ngành Công nghệ AI và Machine Learning',
      type: 'lecture' as const,
      category: 'Hoạt động trải nghiệm nghề nghiệp',
      submittedBy: 'Nguyễn Văn A',
      submittedDate: '08/05/2026',
      fileSize: '3.2 MB',
    },
    {
      id: 'pending-2',
      title: 'Giáo án: Kỹ năng làm việc nhóm',
      type: 'lesson-plan' as const,
      category: 'Kỹ năng nghề nghiệp',
      submittedBy: 'Trần Thị B',
      submittedDate: '07/05/2026',
      fileSize: '2.1 MB',
    },
  ]);

  const [workspaceDocuments, setWorkspaceDocuments] = useState([
    {
      id: 'ws-1',
      title: 'Ngành Công nghệ thông tin',
      type: 'lecture' as const,
      category: 'Hoạt động trải nghiệm nghề nghiệp',
      date: '05/05/2026',
      fileSize: '2.4 MB',
      isPending: false,
    },
    {
      id: 'ws-2',
      title: 'Giáo án: Kỹ năng giao tiếp',
      type: 'lesson-plan' as const,
      category: 'Kỹ năng nghề nghiệp',
      date: '04/05/2026',
      fileSize: '1.8 MB',
      isPending: false,
    },
  ]);

  const [publicDocuments, setPublicDocuments] = useState([
    { id: 'pub-1', title: 'Tết truyền thống Việt Nam', type: 'lecture' as const, category: 'Văn hóa dân tộc', date: '03/05/2026', fileSize: '3.2 MB' },
    { id: 'pub-2', title: 'Giáo án: Quản lý tài chính cá nhân', type: 'lesson-plan' as const, category: 'Kỹ năng sống', date: '02/05/2026', fileSize: '1.5 MB' },
    { id: 'pub-3', title: 'Định hướng nghề nghiệp', type: 'lecture' as const, category: 'Tư vấn hướng nghiệp', date: '01/05/2026', fileSize: '2.1 MB' },
    { id: 'pub-4', title: 'Viết CV xin việc chuyên nghiệp', type: 'lecture' as const, category: 'Kỹ năng tìm việc', date: '30/04/2026', fileSize: '1.6 MB' },
  ]);

  const [templateDocuments, setTemplateDocuments] = useState([
    { id: 't-1', title: 'Giáo án mẫu: HĐTN 10', type: 'lesson-plan' as const, category: 'Giáo án', date: '08/05/2026', fileSize: '1.2 MB' },
    { id: 't-2', title: 'Bài giảng mẫu: Chuyển đổi số', type: 'lecture' as const, category: 'Bài giảng', date: '07/05/2026', fileSize: '2.5 MB' },
    { id: 't-3', title: 'Mẫu kế hoạch ngoại khóa', type: 'activity' as const, category: 'Hoạt động', date: '06/05/2026', fileSize: '0.8 MB' },
    { id: 't-4', title: 'Tài liệu hướng dẫn OCR', type: 'lecture' as const, category: 'Hướng dẫn', date: '05/05/2026', fileSize: '3.1 MB' },
  ]);

  const [publicLibraryStructure, setPublicLibraryStructure] = useState<TreeNodeData[]>([
    {
      id: 'pub-1',
      name: 'Hoạt động trải nghiệm',
      type: 'folder',
      fileCount: 45,
      children: [
        { id: 'pub-1-1', name: 'Văn hóa dân tộc', type: 'folder', fileCount: 7 },
        { id: 'pub-1-2', name: 'Kỹ năng sống', type: 'folder', fileCount: 8 },
      ],
    },
    {
      id: 'pub-2',
      name: 'Hướng nghiệp',
      type: 'folder',
      fileCount: 28,
      children: [
        { id: 'pub-2-1', name: 'Tư vấn hướng nghiệp', type: 'folder', fileCount: 10 },
      ],
    },
  ]);
  
  const [users, setUsers] = useState([
    { id: 'u-1', name: 'Nguyễn Văn A', email: 'vana@school.edu.vn', role: 'Quản trị viên', avatar: 'A' },
    { id: 'u-2', name: 'Trần Thị B', email: 'thib@school.edu.vn', role: 'Giáo viên', avatar: 'B' },
    { id: 'u-3', name: 'Lê Văn C', email: 'vanc@school.edu.vn', role: 'Giáo viên', avatar: 'C' },
    { id: 'u-4', name: 'Phạm Thị D', email: 'thid@school.edu.vn', role: 'Giáo viên', avatar: 'D' },
  ]);

  const handleUpdateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    alert(`Đã cập nhật vai trò cho ${users.find(u => u.id === userId)?.name}`);
  };

  const handleCreateFolder = (name: string, parentId: string) => {
    const newFolder: TreeNodeData = {
      id: `${parentId}-${Date.now()}`,
      name,
      type: 'folder',
      fileCount: 0,
      children: [],
    };

    const updateStructure = (nodes: TreeNodeData[]): TreeNodeData[] => {
      if (parentId === 'root') {
        return [...nodes, newFolder];
      }
      return nodes.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [...(node.children || []), newFolder],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateStructure(node.children),
          };
        }
        return node;
      });
    };

    if (currentView === 'workspace') {
      setWorkspaceStructure(updateStructure(workspaceStructure));
    } else {
      setPublicLibraryStructure(updateStructure(publicLibraryStructure));
    }
  };

  const handleCreateDocument = (name: string, type: 'word' | 'powerpoint' | 'excel' | 'pdf', folderId: string, template?: string) => {
    if (type === 'word' || type === 'powerpoint') {
      let initialContent = '';
      if (template?.startsWith('lesson-plan')) {
        initialContent = `# GIÁO ÁN CHUẨN: ${name}\n\n## 1. MỤC TIÊU BÀI HỌC\n- Về kiến thức: ...\n- Về kỹ năng: ...\n- Về thái độ: ...\n\n## 2. CHUẨN BỊ\n- Giáo viên: ...\n- Học sinh: ...\n\n## 3. TIẾN TRÌNH DẠY HỌC\n- Ổn định lớp\n- Kiểm tra bài cũ\n- Bài mới\n\n## 4. CỦNG CỐ & DẶN DÒ`;
      } else if (template?.startsWith('lecture')) {
        initialContent = `# BÀI GIẢNG CHI TIẾT: ${name}\n\n## I. ĐẶT VẤN ĐỀ\n...\n\n## II. NỘI DUNG CHÍNH\n1. Khái niệm\n2. Đặc điểm\n3. Ý nghĩa\n\n## III. TỔNG KẾT`;
      } else if (template?.startsWith('activity')) {
        initialContent = `# KẾ HOẠCH HOẠT ĐỘNG TRẢI NGHIỆM: ${name}\n\n### 1. Tên chủ đề: ...\n### 2. Mục tiêu hoạt động: ...\n### 3. Đối tượng tham gia: ...\n### 4. Thời gian và địa điểm: ...\n### 5. Nội dung chi tiết: ...`;
      } else if (template?.startsWith('lib')) {
        initialContent = `# NỘI DUNG TỪ THƯ VIỆN: ${name}\n\n[Dữ liệu gốc được tải từ kho lưu trữ hệ thống...]\n\nNội dung chi tiết đang được đồng bộ hóa...`;
      }

      const newFile: TreeNodeData = {
        id: `w-file-${Date.now()}`,
        name: `${name}.${type === 'word' ? 'docx' : 'pptx'}`,
        type: 'file',
      };

      const updateStructure = (nodes: TreeNodeData[]): TreeNodeData[] => {
        if (folderId === 'root') {
          return [...nodes, newFile];
        }
        return nodes.map((node) => {
          if (node.id === folderId) {
            return {
              ...node,
              children: [...(node.children || []), newFile],
            };
          }
          if (node.children) {
            return {
              ...node,
              children: updateStructure(node.children),
            };
          }
          return node;
        });
      };

      setWorkspaceStructure(updateStructure(workspaceStructure));
      setCurrentDocument({ title: name, type, content: initialContent });
      setCurrentScreen('editor');
    } else {
      alert(`Đã tạo ${type === 'excel' ? 'bảng tính' : 'PDF'}: ${name}`);
    }
  };

  const handleEditDocument = (title: string, type: 'lecture' | 'lesson-plan' | 'word' | 'powerpoint') => {
    setCurrentDocument({ title, type: type === 'lecture' || type === 'lesson-plan' ? 'word' : type as 'word' | 'powerpoint' });
    setCurrentScreen('editor');
  };

  const handleRequestPublish = (docId: string) => {
    const doc = workspaceDocuments.find(d => d.id === docId);
    if (doc) {
      alert(`Đã gửi đề xuất công khai cho tài liệu: ${doc.title}`);
    }
  };

  const handleApprove = (id: string, folderId: string) => {
    const doc = pendingDocuments.find(d => d.id === id);
    if (!doc) return;

    const newFile: TreeNodeData = {
      id: `file-${Date.now()}`,
      name: `${doc.title}.${doc.type === 'lecture' ? 'pptx' : 'docx'}`,
      type: 'file',
    };

    const updatePublicStructure = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes.map((node) => {
        if (node.id === folderId) {
          return {
            ...node,
            fileCount: (node.fileCount || 0) + 1,
            children: [...(node.children || []), newFile],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updatePublicStructure(node.children),
          };
        }
        return node;
      });
    };

    setPublicLibraryStructure(updatePublicStructure(publicLibraryStructure));
    setPendingDocuments(pendingDocuments.filter(d => d.id !== id));
    alert(`Đã phê duyệt và công khai tài liệu vào thư mục!`);
  };

  const handleReject = (id: string) => {
    setPendingDocuments(pendingDocuments.filter(doc => doc.id !== id));
    alert('Đã từ chối tài liệu!');
  };

  const handleUploadTemplate = (template: any) => {
    setTemplateDocuments([template, ...templateDocuments]);
    alert('Đã tải lên tài liệu mẫu thành công!');
  };

  const [isUploadFromPCOpen, setIsUploadFromPCOpen] = useState(false);

  const handleUploadFromPC = (fileInfo: any) => {
    // Add to workspace structure (root for simplicity or active folder)
    const newFile: TreeNodeData = {
      id: `pc-file-${Date.now()}`,
      name: fileInfo.title,
      type: 'file',
    };
    setWorkspaceStructure([...workspaceStructure, newFile]);
    alert(`Đã tải lên tài liệu: ${fileInfo.title}`);
  };

  const handleDeleteDocument = (docId: string, title: string) => {
    setDeleteConfirm({ isOpen: true, docId, title });
  };

  const handleDeleteNode = (nodeId: string, nodeName: string) => {
    setDeleteConfirm({ isOpen: true, docId: nodeId, title: nodeName });
  };

  const handleConfirmDelete = () => {
    const { docId } = deleteConfirm;
    
    // Recursive removal function
    const removeNode = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes
        .filter((node) => node.id !== docId)
        .map((node) => ({
          ...node,
          children: node.children ? removeNode(node.children) : undefined,
        }));
    };

    if (currentView === 'workspace') {
      setWorkspaceDocuments(workspaceDocuments.filter(d => d.id !== docId));
      setWorkspaceStructure(removeNode(workspaceStructure));
    } else if (currentView === 'public-library') {
      setPublicDocuments(publicDocuments.filter(d => d.id !== docId));
      setPublicLibraryStructure(removeNode(publicLibraryStructure));
    } else if (currentView === 'templates-library') {
      setTemplateDocuments(templateDocuments.filter(d => d.id !== docId));
    }
    
    setDeleteConfirm({ isOpen: false, docId: '', title: '' });
    alert('Đã gỡ/xóa thành công!');
  };

  const getCurrentDocuments = () => {
    if (currentView === 'workspace') return workspaceDocuments;
    if (currentView === 'templates-library') {
      if (selectedTemplateCategory === 'all') return templateDocuments;
      return templateDocuments.filter(doc => doc.category === selectedTemplateCategory);
    }
    if (currentView === 'public-library') {
      if (selectedPublicCategory === 'all') return publicDocuments;
      return publicDocuments.filter(doc => doc.type === selectedPublicCategory || doc.category === selectedPublicCategory);
    }
    return publicDocuments;
  };

  const getPublicFolders = (structure: TreeNodeData[]): Array<{ id: string; name: string }> => {
    const folders: Array<{ id: string; name: string }> = [];
    const traverse = (nodes: TreeNodeData[], prefix = '') => {
      nodes.forEach((node) => {
        if (node.type === 'folder') {
          folders.push({ id: node.id, name: prefix + node.name });
          if (node.children) {
            traverse(node.children, prefix + node.name + ' / ');
          }
        }
      });
    };
    traverse(structure);
    return folders;
  };

  if (currentScreen === 'editor' && currentDocument) {
    return (
      <DocumentEditor
        isOpen={true}
        onClose={() => {
          setCurrentScreen('dashboard');
          setCurrentDocument(null);
        }}
        documentTitle={currentDocument.title}
        documentType={currentDocument.type}
        initialContent={currentDocument.content}
      />
    );
  }

  return (
    <div className="size-full flex flex-col bg-background">
      <Header />
      <TabNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
        hasUploadPermission={hasUploadPermission}
        pendingCount={pendingDocuments.length}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onNodeSelect={setSelectedNode}
          onDeleteNode={handleDeleteNode}
          viewMode={currentView === 'approvals' || currentView === 'templates-library' || currentView === 'user-management' ? 'public-library' : currentView}
          onCreateFolder={(currentView === 'workspace' || (currentView === 'public-library' && hasUploadPermission)) ? () => setIsCreateFolderOpen(true) : undefined}
          workspaceStructure={workspaceStructure}
          publicStructure={publicLibraryStructure}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-6">
              <UserRoleToggle
                hasUploadPermission={hasUploadPermission}
                onToggle={() => setHasUploadPermission(!hasUploadPermission)}
              />
            </div>

            {currentView === 'approvals' && hasUploadPermission ? (
              <ApprovalPanel
                pendingDocuments={pendingDocuments}
                publicFolders={getPublicFolders(publicLibraryStructure)}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ) : (
              <>
                {currentView === 'public-library' && (
                  <div className="mb-8">
                    <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit border border-border">
                      {[
                        { id: 'all', label: 'Tất cả tài liệu' },
                        { id: 'lesson-plan', label: 'Giáo án' },
                        { id: 'lecture', label: 'Bài giảng' },
                        { id: 'Văn hóa dân tộc', label: 'Văn hóa' },
                        { id: 'Kỹ năng sống', label: 'Kỹ năng' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedPublicCategory(cat.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedPublicCategory === cat.id
                              ? 'bg-card text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentView === 'workspace' && (
                  <>
                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setIsCreateDocumentOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                      >
                        <FilePlus className="w-5 h-5" />
                        Tạo tài liệu mới
                      </button>
                      <button
                        onClick={() => setIsUploadFromPCOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white border border-border text-foreground rounded-lg hover:bg-accent transition-colors shadow-sm"
                      >
                        <Upload className="w-5 h-5" />
                        Tải tài liệu từ máy tính
                      </button>
                    </div>
                  </>
                )}

                {currentView === 'templates-library' && (
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setIsUploadTemplateOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-md hover:shadow-indigo-200"
                      >
                        <Upload className="w-5 h-5" />
                        Tải lên tài liệu mẫu
                      </button>
                    </div>

                    <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit border border-border">
                      {[
                        { id: 'all', label: 'Tất cả mẫu' },
                        { id: 'Giáo án', label: 'Giáo án' },
                        { id: 'Bài giảng', label: 'Bài giảng' },
                        { id: 'Hoạt động', label: 'Hoạt động' },
                        { id: 'Hướng dẫn', label: 'Hướng dẫn' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedTemplateCategory(cat.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedTemplateCategory === cat.id
                              ? 'bg-card text-foreground shadow-sm'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2>
                        {selectedNode
                          ? `Tài liệu: ${selectedNode.name}`
                          : currentView === 'workspace'
                          ? 'Tài liệu của tôi'
                          : currentView === 'templates-library'
                          ? 'Kho tài liệu mẫu'
                          : currentView === 'user-management'
                          ? 'Quản lý người dùng hệ thống'
                          : 'Thư viện công khai'}
                      </h2>
                      {selectedNode && selectedNode.type === 'folder' && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedNode.fileCount} tài liệu
                        </p>
                      )}
                    </div>
                    <button className="text-primary hover:underline">
                      Xem tất cả
                    </button>
                  </div>

                {currentView === 'user-management' && (
                  <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <table className="w-full text-left border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Người dùng</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Email</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Vai trò</th>
                          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-accent/5 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                  {user.avatar}
                                </div>
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {user.role === 'Quản trị viên' ? (
                                  <ShieldAlert className="w-4 h-4 text-red-500" />
                                ) : (
                                  <Shield className="w-4 h-4 text-blue-500" />
                                )}
                                <span className={`text-sm font-medium ${user.role === 'Quản trị viên' ? 'text-red-600' : 'text-blue-600'}`}>
                                  {user.role}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <select
                                value={user.role}
                                onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                                className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              >
                                <option value="Quản trị viên">Quản trị viên</option>
                                <option value="Giáo viên">Giáo viên</option>
                                <option value="Người dùng">Người dùng</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {currentView !== 'user-management' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getCurrentDocuments().map((doc) => (
                      <CourseCard
                        key={doc.id}
                        title={doc.title}
                        type={doc.type}
                        category={doc.category}
                        date={doc.date}
                        fileSize={doc.fileSize}
                        hasUploadPermission={hasUploadPermission}
                        isWorkspace={currentView === 'workspace'}
                        isPending={'isPending' in doc ? doc.isPending : false}
                        onRequestPublish={() => handleRequestPublish(doc.id)}
                        onEdit={() => handleEditDocument(doc.title, doc.type)}
                        onDelete={() => handleDeleteDocument(doc.id, doc.title)}
                      />
                    ))}
                  </div>
                )}
                </div>

                {currentView === 'workspace' && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">12</div>
                      <div className="text-blue-100">Tài liệu của tôi</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">8</div>
                      <div className="text-green-100">Đã đề xuất</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">5</div>
                      <div className="text-purple-100">Đã được duyệt</div>
                    </div>
                  </div>
                )}

                {currentView !== 'workspace' && (
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">73</div>
                      <div className="text-blue-100">Tổng tài liệu</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">45</div>
                      <div className="text-green-100">Hoạt động trải nghiệm</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                      <div className="text-4xl mb-2">28</div>
                      <div className="text-purple-100">Hướng nghiệp</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreateFolder={handleCreateFolder}
        parentFolders={currentView === 'workspace' ? getPublicFolders(workspaceStructure) : getPublicFolders(publicLibraryStructure)}
      />

      <CreateDocumentModal
        isOpen={isCreateDocumentOpen}
        onClose={() => setIsCreateDocumentOpen(false)}
        onCreateDocument={handleCreateDocument}
        folders={getPublicFolders(workspaceStructure)}
      />

      <UploadTemplateModal
        isOpen={isUploadTemplateOpen}
        onClose={() => setIsUploadTemplateOpen(false)}
        onUpload={handleUploadTemplate}
      />

      <UploadTemplateModal
        isOpen={isUploadFromPCOpen}
        onClose={() => setIsUploadFromPCOpen(false)}
        onUpload={handleUploadFromPC}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirm.isOpen}
        title={deleteConfirm.title}
        onClose={() => setDeleteConfirm({ ...deleteConfirm, isOpen: false })}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}