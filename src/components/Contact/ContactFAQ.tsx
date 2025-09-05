'use client';

import { useState } from "react";
import faqData from "@/data/faq";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 text-dark-base bg-light-base dark:bg-dark-base dark:text-light-base section-padding-x">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <h2 className="font-bold mb-2">Pertanyaan yang Sering Diajukan</h2>
          <p className="">
            Berikut adalah beberapa pertanyaan yang sering diajukan oleh
            pengunjung website kami. Jika Anda tidak menemukan jawaban atas
            pertanyaan Anda, silakan hubungi kami.
          </p>
        </div>
        <div className="md:w-2/3 space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-100 rounded-lg shadow-sm overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-4 md:p-6 flex justify-between items-center text-left focus:outline-none"
              >
                <h4 className="font-bold text-sipil-base pr-4">
                  {item.question}
                </h4>
                <div className={`text-sipil-base transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <p className="p-4 md:p-6 pt-1 md:pt-2 text-gray-secondary border-t border-gray-100">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}