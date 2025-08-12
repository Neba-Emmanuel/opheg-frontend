import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/SEO";

interface ChatMsg { role: "assistant" | "user"; content: string; ts: number }

const demoReply = (text: string): string => {
  const t = text.toLowerCase();
  if (t.includes("fever") || t.includes("malaria")) {
    return "Fever can be caused by malaria or infections. If you have high fever, severe headache, or vomiting, seek care urgently. Drink fluids, rest, and consider a rapid malaria test at a clinic. This is general guidance, not a diagnosis.";
  }
  if (t.includes("hiv") || t.includes("aids")) {
    return "HIV testing and early treatment are vital. Use protection, avoid sharing needles, and visit a certified testing center. We can guide you to local resources in Kumba. This is not a substitute for medical advice.";
  }
  if (t.includes("pregnan")) {
    return "For pregnancy-related concerns, antenatal visits are essential. Eat balanced meals, take iron/folate as advised, and report bleeding or severe pain immediately.";
  }
  if (t.includes("diarrh")) {
    return "For diarrhea, prevent dehydration with oral rehydration solution (ORS). If there is blood, high fever, or persistent symptoms, go to the nearest clinic.";
  }
  return "Thank you for your question. Based on your message, I can share general guidance and when to seek care. For emergencies (trouble breathing, severe bleeding, fainting), contact local services immediately.";
};

const HealthAI = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m OPHEG’s Health AI in demo mode. I can provide general health information, but this is not medical advice. How can I help you today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    const user: ChatMsg = { role: "user", content, ts: Date.now() };
    setMessages((m) => [...m, user]);
    setInput("");
    setTimeout(() => {
      const assistant: ChatMsg = { role: "assistant", content: demoReply(content), ts: Date.now() };
      setMessages((m) => [...m, assistant]);
    }, 350);
  };

  return (
    <>
      <SEO
        title="Health AI Chat – OPHEG"
        description="Chat with OPHEG’s Health AI for general guidance. Demo mode; not a substitute for medical care."
        canonical="/health-ai"
        jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage" }}
      />

      <div className="container grid gap-6 py-12">
        <div className="rounded-lg border bg-secondary/30 p-4 text-sm text-muted-foreground">
          Live AI will be enabled after connecting a backend (Supabase) and an AI provider. This page currently runs in private demo mode.
        </div>

        <h1 className="display-title text-3xl">Health AI Chat</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="md:col-span-2">
            <div className="flex h-[60vh] flex-col rounded-lg border bg-card">
              <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((m, i) => (
                  <div key={i} className={m.role === "assistant" ? "mr-auto max-w-[85%] rounded-lg border bg-secondary/40 p-3" : "ml-auto max-w-[85%] rounded-lg bg-primary p-3 text-primary-foreground"}>
                    <p className="text-sm leading-relaxed">{m.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={send} className="flex items-center gap-2 border-t p-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about symptoms, prevention, or care..."
                />
                <Button type="submit" variant="hero">Send</Button>
              </form>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Disclaimer: OPHEG’s Health AI provides educational information only and does not replace professional medical advice, diagnosis, or treatment.
            </p>
          </section>

          <aside className="space-y-3">
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
              <p className="mt-2 text-sm text-muted-foreground">If you have severe symptoms (difficulty breathing, severe bleeding, fainting), seek emergency care immediately.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default HealthAI;
