import React, { useState, useEffect, useRef } from 'react';
import { getDormAssistantResponse, draftIssueReport } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageCircle, User, Bot, Send, PenTool, Wifi, Volume2, Moon } from 'lucide-react';

const Support: React.FC = () => {
  const [tab, setTab] = useState<'faq' | 'issue'>('faq');
  
  // FAQ Chat State
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '0', role: 'model', text: 'Hi! I can help with WiFi, guest policies, laundry info, and more. What do you need?', timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Issue Reporting State
  const [issueText, setIssueText] = useState('');
  const [draftedEmail, setDraftedEmail] = useState('');
  const [isDrafting, setIsDrafting] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for Gemini SDK
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await getDormAssistantResponse(userMsg.text, history);
    
    const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleDraftReport = async () => {
    if (!issueText.trim()) return;
    setIsDrafting(true);
    const draft = await draftIssueReport(issueText);
    setDraftedEmail(draft);
    setIsDrafting(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tab Switcher */}
      <div className="flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setTab('faq')}
          className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-all ${tab === 'faq' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:scale-105'}`}
        >
          Dorm Assistant
        </button>
        <button
          onClick={() => setTab('issue')}
          className={`flex-1 py-4 text-sm font-medium text-center border-b-2 transition-all ${tab === 'issue' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:scale-105'}`}
        >
          Report Issue
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {tab === 'faq' ? (
          <div className="h-full flex flex-col">
             {/* Quick Actions */}
             <div className="px-4 py-3 bg-white border-b border-gray-100 flex gap-2 overflow-x-auto no-scrollbar">
                <button onClick={() => setInput("What is the WiFi password?")} className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                   <Wifi size={12} /> <span>WiFi</span>
                </button>
                <button onClick={() => setInput("What are the quiet hours?")} className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                   <Volume2 size={12} /> <span>Quiet Hours</span>
                </button>
                <button onClick={() => setInput("Guest policy?")} className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600 whitespace-nowrap hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                   <Moon size={12} /> <span>Guests</span>
                </button>
             </div>

             {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary-100 ml-2' : 'bg-gray-200 mr-2'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-primary-600" /> : <Bot size={14} className="text-gray-600" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2 text-xs text-gray-500 animate-pulse ml-10">
                       UniBot is typing...
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-primary-400 transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="ml-2 p-1.5 bg-primary-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed transition-transform hover:scale-110 active:scale-90 hover:shadow-md"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-4 space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
               <h3 className="text-blue-800 font-bold text-sm mb-1">Contacting Dorm Manager</h3>
               <p className="text-blue-600 text-xs">Describe your issue below, and AI will help you draft a professional message.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Issue Details</label>
              <textarea
                value={issueText}
                onChange={(e) => setIssueText(e.target.value)}
                placeholder="e.g. My sink is leaking and the heater is making a weird noise..."
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-sm h-32 resize-none"
              />
              <button 
                onClick={handleDraftReport}
                disabled={isDrafting || !issueText}
                className="flex items-center justify-center w-full py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:transform-none"
              >
                {isDrafting ? 'Drafting...' : <><PenTool size={14} className="mr-2" /> Draft Message with AI</>}
              </button>
            </div>

            {draftedEmail && (
              <div className="space-y-2 animate-in fade-in slide-in-from-bottom-5">
                <label className="text-sm font-semibold text-gray-700">Preview & Send</label>
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {draftedEmail}
                </div>
                <div className="flex space-x-3 pt-2">
                   <button className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg">
                      Send to Manager
                   </button>
                   <button onClick={() => setDraftedEmail('')} className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
                      Clear
                   </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;