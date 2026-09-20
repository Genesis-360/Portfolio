"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: string;
  q: string;
  a: string;
};

type FaqSectionProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  faqs: FAQItem[];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function FaqSection({
  eyebrow = "FAQ",
  heading = "Questions, answered.",
  description = "The things people ask most often. Still stuck? Reach out and we'll walk you through it.",
  faqs,
}: FaqSectionProps) {
  return (
    <section data-slot="faq" className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-anton text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.95] tracking-tight text-cream">
            {heading}
          </h2>
          <p className="mt-5 text-base text-cream/50 lg:text-lg">
            {description}
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <Accordion type="single" collapsible>
          <motion.div
            className="grid gap-0 divide-y divide-cream/10 border-y border-cream/10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {faqs.map((item, index) => (
              <motion.div key={item.id} variants={itemVariants}>
                <AccordionItem value={item.id} className="border-0">
                  <AccordionTrigger className="py-5 text-left hover:no-underline group">
                    <div className="flex items-baseline gap-4">
                      <span className="font-anton text-2xl text-cream/30 transition-colors group-hover:text-accent lg:text-3xl">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-medium text-cream transition-colors group-hover:text-accent lg:text-xl">
                        {item.q}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pr-4 pb-4">
                    <p className="text-base leading-relaxed text-cream/60">
                      {item.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </motion.div>
        </Accordion>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 flex items-center gap-4 text-sm text-cream/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="h-px w-8 bg-cream/20" />
          <p>
            Still have questions?{" "}
            <a
              href="/contact"
              className="text-accent transition-colors hover:text-cream"
            >
              Let&apos;s talk
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
