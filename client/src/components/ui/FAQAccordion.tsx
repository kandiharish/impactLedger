import { useState } from 'react';
import type { FAQItem } from '../../data/mockData';

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div 
            key={item.id} 
            className="bg-surface-pure border border-border-light rounded-card overflow-hidden transition-all duration-300 shadow-sm"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center px-6 py-5 text-left font-serif font-bold text-primary hover:text-accent transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <span className={`text-xl transition-transform duration-300 transform ${isOpen ? 'rotate-45' : ''}`}>
                +
              </span>
            </button>
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-60 border-t border-border-light opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 py-5 text-sm text-text-secondary font-sans leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
