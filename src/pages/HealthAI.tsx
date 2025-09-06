import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown"; // ✅ import renderer

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ChatMsg {
  role: "assistant" | "user";
  content: string;
  ts: number;
}

const HealthAI = () => {
  const { elementRef: chatRef, isVisible: chatVisible } = useScrollAnimation();
  const { elementRef: sidebarRef, isVisible: sidebarVisible } = useScrollAnimation();
  
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m OPHEG’s Health AI. I can provide general health information. How can I help you today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;

    const user: ChatMsg = { role: "user", content, ts: Date.now() };
    setMessages((m) => [...m, user]);
    setInput("");

    const assistant: ChatMsg = {
      role: "assistant",
      content: "…",
      ts: Date.now(),
    };
    setMessages((m) => [...m, assistant]);

    try {
      const res = await fetch(
        "https://healthbank-backend.vercel.app/api/ophegai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
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
        ...m,
        {
          role: "assistant",
          content: "⚠️ Error streaming AI response.",
          ts: Date.now(),
        },
      ]);
    }
  };

  return (
    <>
      <SEO
        title="Health AI Chat – OPHEG"
        description="Chat with OPHEG’s Health AI for general guidance. Get information on symptoms, prevention, and care in Cameroon, Africa and the World."
        canonical="/health-ai"
        jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage" }}
      />

      <div className="container grid gap-6 py-12">
        <h1 className="display-title text-3xl">Health AI Chat</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <section ref={chatRef} className={`md:col-span-2 transition-all duration-700 ${chatVisible ? 'animate-fade-in animate-scale-in' : 'opacity-0 translate-y-8 scale-95'}`}>
            <div className="flex h-[60vh] flex-col rounded-lg border bg-card">
              <div
                ref={listRef}
                className="flex-1 space-y-4 overflow-y-auto p-4"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={
                      m.role === "assistant"
                        ? "mr-auto max-w-[85%] rounded-lg border bg-secondary/40 p-3 prose prose-sm"
                        : "ml-auto max-w-[85%] rounded-lg bg-primary p-3 text-primary-foreground"
                    }
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      <p>{m.content}</p>
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={send}
                className="flex items-center gap-2 border-t p-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about symptoms, prevention, or care..."
                />
                <Button type="submit" variant="hero">
                  Send
                </Button>
              </form>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Disclaimer: OPHEG’s Health AI provides educational information
              only and does not replace professional medical advice, diagnosis,
              or treatment.
            </p>
          </section>

          <aside ref={sidebarRef} className={`space-y-3 transition-all duration-700 ${sidebarVisible ? 'animate-fade-in' : 'opacity-0 translate-x-8'}`}>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">Quick tips</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Wash hands often and keep clean water available.</li>
                <li>Use bed nets in malaria-prone areas.</li>
                <li>Stay up to date with vaccinations.</li>
              </ul>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-semibold">Emergency</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                If you have severe symptoms (difficulty breathing, severe
                bleeding, fainting), seek emergency care immediately.
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>📞 Health Support: +237 676 395 082 </li>
                  <li>🌐 Location: Kumba, Cameroon</li>
                  <li>📧 Email: support@opheg.com </li>
                </ul>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default HealthAI;
