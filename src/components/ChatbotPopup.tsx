"use client"

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = { from: 'user' | 'bot'; text: string };

const BOT_RESPONSES: { keywords: string[]; reply: string }[] = [
  { keywords: ['need blood', 'need', 'blood', 'want blood', 'require'],      reply: "Select a blood group on the Search page to find nearby donors instantly. 🩸" },
  { keywords: ['donate', 'donor', 'give blood', 'register donor'],           reply: "Register as a Donor on our Register page, set your availability and save lives! ❤️" },
  { keywords: ['hospital', 'sos', 'emergency', 'urgent'],                    reply: "For hospital emergencies, raise an SOS request from your Hospital Dashboard. 🚨" },
  { keywords: ['blood bank', 'bank', 'stock', 'inventory'],                  reply: "Blood Banks can manage stock levels from their dedicated dashboard. 📦" },
  { keywords: ['verify', 'trust', 'digilocker', 'verified'],                 reply: "You can verify your profile via DigiLocker or OTP from the Dashboard > Trust Center. 🔐" },
  { keywords: ['hello', 'hi', 'hey', 'namaste', 'helo'],                     reply: "Hello! 👋 I'm HemoBot. Ask me about donating blood, finding donors, or emergencies!" },
  { keywords: ['help', 'support', 'assist'],                                  reply: "I can help with: donating blood, finding donors, hospital SOS, or blood bank stock. What do you need? 🤝" },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, reply } of BOT_RESPONSES) {
    if (keywords.some(k => lower.includes(k))) return reply;
  }
  return "I'm not sure I understand. Try asking: 'I need blood' or 'How to donate?' 🤔";
}

export function ChatbotPopup() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi! 👋 I'm HemoBot. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { from: 'user', text: trimmed };
    const botMsg: Message = { from: 'bot', text: getBotReply(trimmed) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-red-700 text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[480px] flex flex-col rounded-[1.75rem] overflow-hidden shadow-2xl border bg-background animate-in slide-in-from-bottom-3 fade-in duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-primary text-white">
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Droplet className="h-4 w-4 fill-white" />
            </div>
            <div>
              <p className="font-black text-sm">HemoBot</p>
              <p className="text-xs text-white/70">Always here to help</p>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/70 hover:text-white transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 max-h-[300px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-muted text-foreground rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <Input
              placeholder="Type a message..."
              className="rounded-xl h-11 text-sm border-2 focus:ring-primary"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
            />
            <Button onClick={handleSend} size="icon" className="h-11 w-11 shrink-0 bg-primary hover:bg-red-700 rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
