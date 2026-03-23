"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, MessageSquare, Bot, CheckCheck, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I need A+ blood urgently at City Hospital.", sender: 'user', time: '10:00 AM' },
    { id: 2, text: "HemoLink Bot is searching for nearby donors...", sender: 'bot', time: '10:00 AM' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMsg: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);

    // Fake reply after 1.5s
    setTimeout(() => {
      const botMsg: Message = {
        id: Date.now() + 1,
        text: "I've alerted 5 verified donors in your vicinity. One donor is already on their way. Estimated arrival at your location: 12 minutes.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="rounded-[2rem] border-none shadow-2xl overflow-hidden glassmorphism flex flex-col h-[500px]">
      <CardHeader className="bg-primary p-6 text-white shrink-0">
         <CardTitle className="flex items-center gap-3 text-xl font-black italic tracking-tight">
            <MessageSquare className="h-6 w-6 fill-white" />
            HemoLink Live Chat
         </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-6" viewportRef={scrollRef}>
          <div className="space-y-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.sender === 'user' ? "bg-slate-200 dark:bg-slate-700" : "bg-primary/20",
                  "order-2"
                )}>
                  {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
                </div>
                
                <div className="space-y-1">
                  <div className={cn(
                    "p-4 rounded-2xl text-sm font-medium",
                    msg.sender === 'user' 
                      ? "bg-slate-100 dark:bg-slate-800 text-foreground rounded-tr-none" 
                      : "bg-primary text-white rounded-tl-none shadow-lg shadow-primary/10"
                  )}>
                    {msg.text}
                  </div>
                  <div className={cn(
                    "text-[10px] font-bold text-muted-foreground flex items-center gap-1",
                    msg.sender === 'user' ? "justify-end" : "justify-start"
                  )}>
                    {msg.time}
                    {msg.sender === 'user' && <CheckCheck className="h-3 w-3 text-primary" />}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-primary text-white p-3 rounded-2xl rounded-tl-none shadow-lg shadow-primary/10">
                   <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 bg-background border-t">
          <div className="flex gap-2">
            <Input 
              placeholder="Ask for updates or help..." 
              className="h-12 rounded-xl bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button 
              onClick={handleSend}
              className="h-12 w-12 rounded-xl bg-primary hover:bg-red-700 flex items-center justify-center p-0 shrink-0 shadow-lg shadow-primary/20"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
