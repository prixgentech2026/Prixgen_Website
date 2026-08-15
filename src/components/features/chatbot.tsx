'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Send, X, Bot, Sparkles, Loader2, RotateCcw, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const SUGGESTIONS = [
  { label: '🤖 AI & Automation', prompt: 'Tell me about AI & Automation services.' },
  { label: '⚙️ Odoo / ERP', prompt: 'What ERP ecosystems and Odoo services do you offer?' },
  { label: '🏭 Manufacturing & IIoT', prompt: 'How do you help with Manufacturing & IIoT?' },
  { label: '📊 Power BI & Analytics', prompt: 'Tell me about your Power BI & Analytics capabilities.' },
  { label: '☁️ Cloud & IT Consulting', prompt: 'What Cloud & IT Consulting options do you provide?' },
  { label: '📞 Talk to an Expert', prompt: 'How can I get in touch to talk to an expert?' }
];

// Helper to format current time in HH:MM AM/PM
const getFormattedTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${strMinutes} ${ampm}`;
};

export function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Delay showing the tooltip by 3 seconds
    const timer = setTimeout(() => {
      const dismissed = sessionStorage.getItem('margai_tooltip_dismissed');
      if (dismissed !== 'true' && !isOpen) {
        setShowTooltip(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message with current time on client side
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('prixgen_chat_history');
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        setMessages([
          {
            role: 'assistant',
            content: 'Hello! I am **MargAI**, your Prixgen AI Assistant. How can I help you optimize, automate, or scale your enterprise operations today?',
            time: getFormattedTime()
          }
        ]);
      }
      const wasOpen = sessionStorage.getItem('prixgen_chat_open');
      if (wasOpen === 'true') {
        setIsOpen(true);
      }
    } catch (e) {
      console.error('Error loading chat history', e);
    }
  }, []);

  // Save chat history to sessionStorage when it changes
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem('prixgen_chat_history', JSON.stringify(messages));
      } catch (e) {
        console.error('Error saving chat history', e);
      }
    }
  }, [messages]);

  // Save open state
  useEffect(() => {
    try {
      sessionStorage.setItem('prixgen_chat_open', isOpen ? 'true' : 'false');
    } catch (e) {
      console.error('Error saving chat open state', e);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Close chatbot if clicking outside of it (for clean UX)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        chatWindowRef.current &&
        !chatWindowRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.chatbot-trigger')
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleNewConversation = () => {
    try {
      sessionStorage.removeItem('prixgen_chat_history');
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I am **MargAI**, your Prixgen AI Assistant. How can I help you optimize, automate, or scale your enterprise operations today?',
          time: getFormattedTime()
        }
      ]);
    } catch (e) {
      console.error('Error clearing chat history', e);
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: textToSend,
      time: getFormattedTime()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save potential pre-fill context to sessionStorage immediately for all pathways
    try {
      const prefillMsg = `I would like to enquire about this topic discussed with MargAI: "${textToSend.trim()}"`;
      sessionStorage.setItem('margai_lead_message', prefillMsg);
    } catch (e) {
      console.error('Error saving lead pre-fill message:', e);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      let botContent = data.content || '';

      // Parse navigation action tag: [ACTION:NAVIGATE:/path]
      const navigateRegex = /\[ACTION:NAVIGATE:(.*?)\]/;
      const match = botContent.match(navigateRegex);

      if (match && match[1]) {
        const targetPath = match[1].trim();
        botContent = botContent.replace(navigateRegex, '').trim();

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: botContent,
            time: getFormattedTime()
          }
        ]);



        // Small delay to allow reading the text before navigating
        setTimeout(() => {
          router.push(targetPath);
        }, 1200);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: botContent,
            time: getFormattedTime()
          }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, MargAI is currently offline. Please get in touch with us by filling out our [contact form](/contact).",
          time: getFormattedTime()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Convert simple markdown-like syntax to bold/italic tags and parse tables/lists dynamically
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    const resultElements: React.ReactNode[] = [];
    
    let inList = false;
    let listItems: string[] = [];
    
    let inTable = false;
    let tableHeaders: string[] = [];
    let tableRows: string[][] = [];
    
    const formatInline = (text: string) => {
      let formatted = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      
      // Convert **bold**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Convert *italic*
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
      // Convert [link text](url)
      formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-prixgen-blue hover:underline font-bold">$1</a>');
      
      return formatted;
    };
    
    const flushList = (key: number) => {
      if (listItems.length > 0) {
        resultElements.push(
          <ul key={`ul-${key}`} className="list-disc pl-5 my-1.5 space-y-1 text-slate-700">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };
    
    const flushTable = (key: number) => {
      if (tableHeaders.length > 0 || tableRows.length > 0) {
        resultElements.push(
          <div key={`table-wrapper-${key}`} className="overflow-x-auto my-3 border border-slate-200/70 rounded-xl shadow-sm max-w-full">
            <table className="min-w-full divide-y divide-slate-200/60 text-[12px] md:text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {tableHeaders.map((header, idx) => (
                    <th key={idx} className="px-3 py-2 text-left font-bold text-slate-700 border-b border-slate-200/60 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: formatInline(header) }} />
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {tableRows.map((row, rowIdx) => (
                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-3 py-1.5 text-slate-600 font-medium" dangerouslySetInnerHTML={{ __html: formatInline(cell) }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableHeaders = [];
        tableRows = [];
      }
      inTable = false;
    };
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // 1. Table Detection
      if (line.startsWith('|')) {
        if (inList) flushList(i);
        
        const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
        
        // Skip separator line (e.g. |---|---|)
        if (cells.every(c => c.match(/^:?-+:?$/))) {
          inTable = true;
          continue;
        }
        
        if (!inTable) {
          tableHeaders = cells;
          inTable = true;
        } else {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        flushTable(i);
      }
      
      // 2. List Detection
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (inTable) flushTable(i);
        inList = true;
        listItems.push(line.substring(2));
        continue;
      } else if (inList) {
        flushList(i);
      }
      
      // 3. Normal paragraph text
      if (line === '') {
        resultElements.push(<div key={`space-${i}`} className="h-2" />);
      } else {
        resultElements.push(
          <div key={`p-${i}`} className="my-1" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
    }
    
    if (inList) flushList(lines.length);
    if (inTable) flushTable(lines.length);
    
    return <div className="space-y-0.5">{resultElements}</div>;
  };

  return (
    <>
      {/* Floating Tooltip/Speech Bubble */}
      {!isOpen && showTooltip && (
        <div className="fixed bottom-8 right-24 z-50 flex items-center gap-1.5 bg-white text-slate-800 text-[12px] font-bold py-2 px-3.5 rounded-xl border border-slate-100 shadow-[0_10px_25px_rgba(0,75,135,0.15)] animate-bounce origin-right transition-all duration-300">
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-r border-slate-100 rotate-45" />
          <Bot className="w-3.5 h-3.5 text-prixgen-blue animate-pulse" />
          <span>Chat with MargAI!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
              sessionStorage.setItem('margai_tooltip_dismissed', 'true');
            }}
            className="ml-1 w-4 h-4 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={10} />
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
          sessionStorage.setItem('margai_tooltip_dismissed', 'true');
        }}
        className="chatbot-trigger fixed bottom-6 right-6 z-50 w-14 h-14 bg-white rounded-full shadow-[0_15px_40px_-5px_rgba(0,75,135,0.4)] border border-slate-100 flex items-center justify-center cursor-pointer overflow-visible p-0 group ring-4 ring-prixgen-blue/5 hover:scale-105 active:scale-95 transition-transform duration-200"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {isOpen ? (
            <div className="rotate-0 scale-100 transition-all duration-200">
              <X className="w-6 h-6 text-prixgen-blue" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-2.5 scale-100 transition-all duration-200 relative">
              <img
                src="/images/icon.png"
                alt="MargAI"
                className="w-full h-full object-contain rounded-full bg-transparent group-hover:scale-105 transition-transform"
              />
              {/* Overlapping Chat Bubble Icon Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-prixgen-blue rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <MessageSquare className="w-3 h-3 text-white" fill="white" />
              </div>
            </div>
          )}

          {/* Glowing active indicator */}
          {!isOpen && (
            <span className="absolute top-0 right-0 flex h-3 w-3 -mt-0.5 -mr-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prixgen-lightblue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-prixgen-lightblue"></span>
            </span>
          )}
        </div>
      </button>

      {/* Chat Window Panel using Ksolves-inspired clean UI */}
      <div
        ref={chatWindowRef}
        data-lenis-prevent
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-8rem)] bg-white border border-slate-200/50 shadow-[0_25px_60px_-15px_rgba(0,75,135,0.25)] rounded-2xl flex flex-col overflow-hidden ring-1 ring-black/5 transition-all duration-300 ease-out origin-bottom-right ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Header (Ksolves styled dark theme with square icon and online state) */}
        <div className="bg-[#1e2229] text-white p-4 flex items-center justify-between shadow-sm border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-200">
              <img src="/images/icon.png" alt="MargAI" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight text-white">MargAI</h3>
              <p className="text-[11px] text-green-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
                Assistant · Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleNewConversation}
              title="New Conversation"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white/85 hover:text-white"
            >
              <RotateCcw size={15} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages Container (F8FAFC background with avatars and labels) */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#F8FAFC] space-y-5 flex flex-col custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Show MargAI avatar and name tag only above bot messages */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-1.5 ml-1">
                  <div className="w-6 h-6 rounded-full bg-prixgen-blue flex items-center justify-center text-[10px] text-white font-black">
                    M
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    MargAI
                  </span>
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm font-medium border ${
                  msg.role === 'user'
                    ? 'bg-prixgen-blue text-white border-prixgen-blue/10 rounded-tr-none'
                    : 'bg-white text-slate-800 border-slate-200/50 rounded-tl-none'
                }`}
              >
                {renderMessageContent(msg.content)}
              </div>

              {/* Timestamp */}
              <span className="text-[10px] text-slate-400 mt-1 mx-2 font-medium">
                {msg.time}
              </span>
            </div>
          ))}

          {/* Loading Typing Indicator */}
          {isLoading && (
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-2 mb-1.5 ml-1">
                <div className="w-6 h-6 rounded-full bg-prixgen-blue flex items-center justify-center text-[10px] text-white font-black">
                  M
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  MargAI
                </span>
              </div>
              <div className="bg-white border border-slate-200/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                <span className="w-2.5 h-2.5 bg-prixgen-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 bg-prixgen-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 bg-prixgen-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions Footer (Floats clean above input) */}
        <div className="px-4 py-2 bg-[#F8FAFC] border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar py-2">
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSend(sug.prompt)}
              className="shrink-0 bg-white hover:bg-prixgen-blue/5 border border-slate-200/60 hover:border-prixgen-blue/30 text-slate-600 hover:text-prixgen-blue text-[11px] py-1.5 px-3.5 rounded-full cursor-pointer transition-all duration-300 font-bold shadow-sm"
            >
              {sug.label}
            </button>
          ))}
        </div>

        {/* Input Form Footer (Pill input + separate round blue send button + Powered By) */}
        <div className="p-3 bg-white flex flex-col gap-2 border-t border-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-3"
          >
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-[#F3F4F6] border border-slate-200/50 rounded-full px-5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-prixgen-blue/30 focus:ring-1 focus:ring-prixgen-blue/20 transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-prixgen-blue hover:bg-[#005bb7] active:scale-95 text-white flex items-center justify-center transition-all disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer shadow-md shadow-prixgen-blue/25 shrink-0"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </form>
          
          <div className="text-[10px] text-slate-400 text-center font-medium mt-1">
            Powered by <span className="font-bold text-prixgen-blue">Prixgen</span>
          </div>
        </div>
      </div>
    </>
  );
}
