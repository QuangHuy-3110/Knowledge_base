import { X, Save, Download, Wand2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Send, User, Bot, Sparkles, PlusCircle, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DocumentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentType: 'word' | 'powerpoint';
  initialContent?: string;
}

export function DocumentEditor({ isOpen, onClose, documentTitle, documentType, initialContent = '' }: DocumentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Chào bạn! Tôi là trợ lý AI chuyên về giáo án. Bạn đang tạo tài liệu "${documentTitle}". Tôi có thể giúp gì cho bạn? Ví dụ: "Hãy lập dàn ý cho bài giảng về Công nghệ thông tin".`,
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = '';
      const prompt = inputValue.toLowerCase();

      if (prompt.includes('giáo án') || prompt.includes('bài giảng')) {
        aiResponse = `Dưới đây là đề xuất khung giáo án cho "${documentTitle}":\n\n1. **Mục tiêu**: Nắm vững kiến thức cơ bản...\n2. **Nội dung chính**: Khám phá các khái niệm...\n3. **Hoạt động**: Thảo luận nhóm, thực hành...\n4. **Kết luận**: Tổng kết và bài tập về nhà.`;
      } else if (prompt.includes('mục tiêu')) {
        aiResponse = `Các mục tiêu đề xuất cho bài giảng này:\n- Hiểu rõ bản chất của vấn đề.\n- Vận dụng kiến thức vào bài tập thực tế.\n- Phát triển kỹ năng tư duy phản biện.`;
      } else {
        aiResponse = `Ý tưởng hay đó! Tôi có thể chi tiết hóa phần này hơn nếu bạn muốn. Bạn có muốn tôi viết cụ thể nội dung cho phần này không?`;
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleApplyToEditor = (text: string) => {
    setContent((prev) => (prev ? prev + '\n\n' + text : text));
  };

  const handleSave = () => {
    alert('Đã lưu tài liệu!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col z-50 animate-in fade-in duration-300">
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${documentType === 'word' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{documentTitle}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-accent rounded-full text-muted-foreground uppercase tracking-wider font-medium">
                  {documentType === 'word' ? 'Văn bản' : 'Trình chiếu'}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Đang lưu tự động
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95"
            >
              <Save className="w-4 h-4" />
              Lưu tài liệu
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 border border-border bg-background hover:bg-accent rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
              Xuất file
            </button>
            <div className="w-px h-8 bg-border mx-1" />
            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Side: Editor */}
          <div className="flex-1 flex flex-col bg-background relative">
            {/* Toolbar */}
            <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/5 sticky top-0 z-10">
              <div className="flex items-center bg-accent/30 rounded-lg p-1 mr-2">
                <button className="p-2 hover:bg-background rounded-md transition-colors"><Bold className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-background rounded-md transition-colors"><Italic className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-background rounded-md transition-colors"><Underline className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center bg-accent/30 rounded-lg p-1 mr-2">
                <button className="p-2 hover:bg-background rounded-md transition-colors"><AlignLeft className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-background rounded-md transition-colors"><AlignCenter className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-background rounded-md transition-colors"><AlignRight className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center bg-accent/30 rounded-lg p-1">
                <button className="p-2 hover:bg-background rounded-md transition-colors"><List className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-background rounded-md transition-colors"><ListOrdered className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-4xl mx-auto h-full">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Bắt đầu viết nội dung tài liệu của bạn tại đây..."
                  className="w-full h-full min-h-[700px] text-lg leading-relaxed bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-muted-foreground/40"
                />
              </div>
            </div>
          </div>

          {/* Right Side: AI Chat Assistant */}
          <div className="w-[400px] border-l border-border bg-muted/10 flex flex-col relative">
            <div className="p-4 border-b border-border bg-background flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="font-semibold">AI Trợ Lý Giáo Án</h4>
              </div>
              <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold uppercase">PRO</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.role === 'user' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border text-purple-500'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none' 
                        : 'bg-background border border-border rounded-tl-none shadow-sm'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                      
                      {msg.role === 'assistant' && msg.id !== '1' && (
                        <button
                          onClick={() => handleApplyToEditor(msg.content)}
                          className="mt-3 flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 font-medium bg-purple-50 px-2 py-1.5 rounded-lg border border-purple-100 transition-colors w-full justify-center"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Chèn vào nội dung bài giảng
                        </button>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 px-10">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-purple-500">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 bg-background border border-border rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-background border-t border-border">
              <div className="relative group">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Hỏi AI về nội dung giáo án..."
                  className="w-full pl-4 pr-12 py-3 bg-muted/30 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-background transition-all resize-none max-h-32 min-h-[48px]"
                  rows={1}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all active:scale-95 disabled:opacity-30 disabled:grayscale disabled:hover:shadow-none"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-center text-muted-foreground mt-3">
                Nhấn Enter để gửi. AI có thể đưa ra câu trả lời không chính xác.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

