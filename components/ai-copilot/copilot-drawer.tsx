"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPILOT_SUGGESTED_PROMPTS, COPILOT_RESPONSES, DEFAULT_COPILOT_REPLY } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; text: string };

export function CopilotDrawer() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi Rohit — I'm the METI Results Explainer. Ask me anything about your report, scores, or roadmap.",
    },
  ]);

  function send(text: string) {
    if (!text.trim()) return;
    const reply = COPILOT_RESPONSES[text.trim().toLowerCase()] ?? DEFAULT_COPILOT_REPLY;
    setMessages((prev) => [...prev, { role: "user", text }, { role: "assistant", text: reply }]);
    setInput("");
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl border border-meti-mint/30 bg-white shadow-elevated overflow-hidden"
          >
            <div className="flex items-center justify-between bg-meti-navy px-4 py-3.5">
              <div className="flex items-center gap-2 text-white">
                <Sparkles className="h-4 w-4 text-meti-mint" />
                <span className="text-sm font-semibold">METI Results Explainer</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="text-meti-cream/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 bg-[#fafffd]">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "assistant"
                      ? "bg-white border border-meti-cream text-meti-navy"
                      : "ml-auto bg-meti-mint/25 text-meti-navy"
                  )}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {COPILOT_SUGGESTED_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full border border-meti-slate/20 px-2.5 py-1 text-[11px] text-meti-slate hover:border-meti-mint hover:text-meti-navy transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-meti-cream p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your report…"
                className="flex-1 rounded-lg border border-meti-slate/20 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-meti-mint"
              />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open METI Results Explainer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-meti-mint text-meti-navy shadow-glow hover:scale-105 transition-transform"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </>
  );
}
