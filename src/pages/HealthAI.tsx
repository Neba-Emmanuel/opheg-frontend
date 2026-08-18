// HealthAI.jsx - Complete Redesign
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import {
  Send,
  Bot,
  User,
  AlertTriangle,
  Phone,
  MapPin,
  Mail,
  Shield,
  Stethoscope,
  Lightbulb,
  ArrowRight,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ChatMsg {
  role: "assistant" | "user";
  content: string;
  ts: number;
}

const HealthAI = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your OPHEG Health Assistant.\n\nI'm here to help you with health-related questions — whether it's about symptoms, prevention, nutrition, or general wellness.\n\n**A few things I can help with:**\n- Understanding common symptoms\n- Prevention tips for diseases\n- General wellness advice\n- When to seek professional help\n\nWhat's on your mind today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const user: ChatMsg = { role: "user", content, ts: Date.now() };
    setMessages((m) => [...m, user]);
    setInput("");
    setIsLoading(true);

    const assistant: ChatMsg = {
      role: "assistant",
      content: "",
      ts: Date.now(),
    };
    setMessages((m) => [...m, assistant]);

    try {
      const systemMessage = {
        role: "system",
        content: `You are OPHEG Health AI, a friendly and knowledgeable health assistant for Optimum Health Global (OPHEG), a healthcare NGO in Cameroon, Africa. 

Guidelines for your responses:
- Write in a warm, conversational tone — like a caring health professional chatting with a patient
- Keep responses concise and well-structured. Use short paragraphs, bullet points, and bold text for key points
- Use markdown formatting: **bold** for emphasis, bullet lists for multiple items, and headings (###) when organizing longer answers
- Include relevant emojis sparingly to keep the conversation friendly (1-2 per response max)
- Always remind users to consult a healthcare professional for serious concerns
- Be specific to the African/Cameroonian context when relevant (mentioning local diseases, available resources, etc.)
- If you don't know something, say so honestly rather than guessing
- End responses with a follow-up question or helpful suggestion when appropriate
- Never diagnose conditions — only provide educational information
- Keep individual responses focused. Don't try to cover everything at once.`,
      };

      const res = await fetch(
        "https://healthbank-backend.vercel.app/api/ophegai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              systemMessage,
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content },
            ],
          }),
        }
      );

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          if (line === "data: [DONE]") break;
          if (line.startsWith("data:")) {
            const data = JSON.parse(line.replace("data: ", ""));
            if (data.token) {
              fullText += data.token;

              setMessages((m) => {
                const updated = [...m];
                updated[updated.length - 1] = {
                  ...assistant,
                  content: fullText,
                };
                return updated;
              });

              listRef.current?.scrollTo({
                top: listRef.current.scrollHeight,
                behavior: "smooth",
              });
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m.slice(0, -1),
        {
          role: "assistant",
          content: "⚠️ I'm having trouble connecting. Please try again in a moment.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickQuestions = [
    "What are common malaria symptoms?",
    "How can I prevent cervical cancer?",
    "Tips for a healthy lifestyle",
    "What vaccinations do I need?",
  ];

  const emergencyContacts = [
    { icon: Phone, label: "Health Support", value: "+237 676 395 082", color: "from-red-500 to-rose-500" },
    { icon: MapPin, label: "Our Location", value: "Kumba, Cameroon", color: "from-blue-500 to-cyan-500" },
    { icon: Mail, label: "Email Support", value: "support@opheg.com", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <>
      <SEO
        title="Health AI Chat – OPHEG"
        description="Chat with OPHEG's Health AI for general guidance. Get information on symptoms, prevention, and care in Cameroon, Africa and the World."
        canonical="/health-ai"
        jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage" }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Header */}
        <section className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          
          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm animate-fade-in">
                <Bot className="w-4 h-4" />
                <span>AI-Powered Health Assistant</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white animate-fade-in">
                Health{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                  AI
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in delay-200">
                Get instant, AI-powered health information and guidance. 
                Available 24/7 for your health questions.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 animate-fade-in delay-300">
                {["24/7 Available", "Evidence-Based", "Free Service", "Privacy First"].map((feature) => (
                  <span key={feature} className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Chat Area */}
        <div className="container mx-auto px-4 -mt-8 pb-16">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Chat Window - Main Focus */}
            <div className="lg:col-span-2">
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-fade-in">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">OPHEG Health AI</h2>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        Online & Ready to Help
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="h-[500px] flex flex-col">
                  <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white"
                  >
                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 animate-fade-in ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {/* Avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`max-w-[80%] ${
                            msg.role === "assistant"
                              ? "bg-white border border-slate-200 shadow-sm"
                              : "bg-gradient-to-br from-blue-500 to-cyan-500 text-white"
                          } rounded-2xl px-4 py-3`}
                        >
                          {msg.role === "assistant" ? (
                            msg.content === "" ? (
                              <div className="flex items-center gap-1.5 py-1">
                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]" />
                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]" />
                                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]" />
                              </div>
                            ) : (
                              <div className="prose prose-sm prose-slate max-w-none prose-p:leading-relaxed prose-p:my-1.5 prose-headings:mt-3 prose-headings:mb-1.5 prose-headings:text-slate-800 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-strong:text-slate-800 prose-a:text-blue-600 prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50/50 prose-blockquote:py-1 prose-blockquote:not-italic">
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              </div>
                            )
                          ) : (
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                          )}
                          
                          {/* Timestamp */}
                          <div className={`text-xs mt-2 ${
                            msg.role === "assistant" ? "text-slate-400" : "text-white/70"
                          }`}>
                            {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        {/* User Avatar */}
                        {msg.role === "user" && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0 mt-1">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Empty State for First Message */}
                    {messages.length === 1 && (
                      <div className="text-center py-8 space-y-4">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center mx-auto">
                          <MessageCircle className="w-10 h-10 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-700">Start a Conversation</h3>
                          <p className="text-sm text-slate-500">Ask me anything about health, symptoms, or prevention</p>
                        </div>
                        
                        {/* Quick Questions */}
                        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                          {quickQuestions.map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setInput(q);
                                inputRef.current?.focus();
                              }}
                              className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <form onSubmit={send} className="p-4 bg-white border-t border-slate-200">
                    <div className="flex gap-3">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about symptoms, prevention, or care..."
                        className="flex-1 rounded-xl h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl h-12 px-6 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    
                    {/* Disclaimer */}
                    <p className="mt-3 text-xs text-slate-400 text-center">
                      <AlertTriangle className="inline w-3 h-3 mr-1" />
                      This AI provides educational information only. Always consult a healthcare professional for medical advice.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Tips */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-fade-in delay-200">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Quick Tips</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { icon: Shield, text: "Wash hands often and keep clean water available.", color: "from-blue-500 to-cyan-500" },
                      { icon: Shield, text: "Use bed nets in malaria-prone areas.", color: "from-emerald-500 to-teal-500" },
                      { icon: Shield, text: "Stay up to date with vaccinations.", color: "from-purple-500 to-pink-500" },
                    ].map((tip, index) => (
                      <div key={index} className="flex gap-3 group hover:scale-105 transition-transform duration-300">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tip.color} flex items-center justify-center shrink-0`}>
                          <tip.icon className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-sm text-slate-600">{tip.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 animate-fade-in delay-300">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Emergency</h3>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    If you have severe symptoms (difficulty breathing, severe bleeding, 
                    fainting), seek emergency care immediately.
                  </p>
                  
                  <div className="space-y-3">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex gap-3 group hover:scale-105 transition-transform duration-300">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                          <contact.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">{contact.label}</p>
                          <p className="text-sm font-semibold text-slate-900">{contact.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book Appointment CTA */}
              <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl overflow-hidden animate-fade-in delay-400">
                <div className="p-6 text-white text-center">
                  <Stethoscope className="w-10 h-10 mx-auto mb-3 text-white/80" />
                  <h3 className="font-bold text-lg mb-2">Need In-Person Care?</h3>
                  <p className="text-white/80 text-sm mb-4">
                    Schedule a consultation with our healthcare professionals.
                  </p>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl"
                  >
                    <Link to="/appointments">
                      Book Appointment
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthAI;