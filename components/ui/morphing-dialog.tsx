"use client";

import type { DialogRootActions } from "@base-ui/react/dialog";
import { PlusIcon, X } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/morphing-dialog-utils/button";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogViewport,
} from "@/components/ui/morphing-dialog-utils/dialog";
import { ScrollArea } from "@/components/ui/morphing-dialog-utils/scroll-area";

export interface MorphingDialogProps {
  items?: CardItem[];
}

export function MorphingDialog({ items }: MorphingDialogProps = {}) {
  const displayItems = items && items.length > 0 ? items : ITEMS;
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<CardItem | null>(null);

  const actionsRef = useRef<DialogRootActions>({
    close: () => {},
    unmount: () => {},
  });

  const handleOpen = (item: CardItem) => {
    setActiveItem(item);
    setIsOpen(true);
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div>
      <LayoutGroup>
        <ScrollArea
          className="w-full whitespace-nowrap container overflow-x-auto pb-4"
          noScrollBar
        >
          <div className="flex gap-4 md:gap-6 lg:gap-8 mx-auto justify-center">
            {displayItems.map((item) => (
              <motion.button
                className="relative group flex flex-col cursor-pointer bg-zinc-900/90 hover:bg-zinc-800/90 border border-white/10 hover:border-white/25 transition-all duration-300 flex-1 min-w-[260px] max-w-[320px] size-72 lg:size-80 rounded-2xl overflow-hidden focus-visible:outline focus-visible:outline-ring focus-visible:ring-4 focus-visible:ring-ring/10 shadow-xl"
                key={item.id}
                layoutId={`card-container-${item.id}`}
                onClick={() => handleOpen(item)}
                style={{
                  opacity: activeItem?.id === item.id && isOpen ? 0 : 1,
                  pointerEvents:
                    activeItem?.id === item.id && isOpen ? "none" : "auto",
                }}
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
                  <motion.div
                    className="w-full h-full"
                    layoutId={`image-container-${item.id}`}
                  >
                    <img
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      height={500}
                      src={item.image}
                      width={500}
                    />
                  </motion.div>
                </div>
                <div className="flex flex-1 p-5 justify-between items-center bg-zinc-950/80 backdrop-blur-md">
                  <motion.h3
                    className="text-lg font-bold text-white tracking-tight"
                    layoutId={`title-${item.id}`}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.h3>

                  <PlusIcon className="group-hover:text-white text-zinc-400 group-hover:rotate-90 transition-all duration-300" />
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
        <Dialog
          actionsRef={actionsRef}
          onOpenChange={handleClose}
          open={isOpen}
        >
          <AnimatePresence mode="popLayout">
            {isOpen && activeItem && (
              <DialogPortal keepMounted>
                <DialogBackdrop className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
                <DialogViewport
                  className="fixed inset-0 z-50 grid place-items-center p-4 pt-12 sm:pt-20 overflow-y-auto"
                  hidden={false}
                >
                  <DialogPopup
                    className="relative w-full max-w-4xl flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-zinc-950 shadow-2xl"
                    hidden={false}
                    render={
                      <motion.div
                        layoutId={`card-container-${activeItem.id}`}
                        onLayoutAnimationComplete={() => {
                          if (!isOpen) {
                            actionsRef.current?.unmount();
                            setTimeout(() => setActiveItem(null), 50);
                          }
                        }}
                      />
                    }
                  >
                    <ScrollArea className="h-[calc(85vh-2rem)] max-h-[800px]" noScrollBar>
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="flex flex-col h-full pb-10"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{
                          duration: 0.15,
                        }}
                      >
                        <div className="relative h-64 sm:h-96 w-full shrink-0 overflow-hidden">
                          <motion.div
                            className="w-full h-full"
                            layoutId={`image-container-${activeItem.id}`}
                          >
                            <img
                              alt={activeItem.title}
                              className="h-full w-full object-cover"
                              height={500}
                              src={activeItem.image}
                              width={500}
                            />
                          </motion.div>
                        </div>

                        <div className="flex flex-col p-6 sm:p-10 justify-start text-left space-y-6">
                          <DialogTitle
                            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"
                            render={
                              <motion.h2 layoutId={`title-${activeItem.id}`}>
                                {activeItem.title}
                              </motion.h2>
                            }
                          />
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.2 }}
                          >
                            {activeItem.content}
                          </motion.div>
                        </div>

                        <DialogClose
                          className="absolute right-4 top-4 z-20"
                          render={
                            <Button
                              className="rounded-full shadow-lg bg-black/60 hover:bg-black/90 text-white border border-white/20"
                              size="icon"
                              variant="secondary"
                            >
                              <X size={18} />
                            </Button>
                          }
                        />
                      </motion.div>
                    </ScrollArea>
                  </DialogPopup>
                </DialogViewport>
              </DialogPortal>
            )}
          </AnimatePresence>
        </Dialog>
      </LayoutGroup>
    </div>
  );
}

type CardItem = {
  id: string;
  title: string;
  image: string;
  content: React.ReactNode;
};

const ITEMS: CardItem[] = [
  {
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>
          Modern development is human + AI. We optimized Lumi UI's structure so
          that AI assistants generate correct, idiomatic code on the first
          attempt.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-white">Flat Semantic Exports:</strong>{" "}
            Every component is accessible at the root level, making it easier
            for AI to infer usage and reducing context tokens.
          </li>
          <li>
            <strong className="text-white">
              Composites as Living Examples:
            </strong>{" "}
            Our composite components serve as executable documentation.
          </li>
          <li>
            <strong className="text-white">Immutable Logic Blocks:</strong>{" "}
            Primitives are stable building blocks. You compose them rather than
            modifying core logic.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-white font-semibold mb-4 text-lg">
            Deep Dive: Optimization
          </h4>
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-4 space-y-2" key={i}>
                <div className="h-4 w-1/3 bg-zinc-800 rounded" />
                <div className="h-20 w-full bg-zinc-800/60 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    id: "card-1",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    title: "Discoverable",
  },
  {
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>
          Base UI provides the behavioral foundation, but we provide the visual
          consistency. Every component adapts to your needs following a unified
          language.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-white">The Utility Pattern:</strong> We
            use utility classes to provide consistent styling across all
            components.
          </li>
          <li>
            <strong className="text-white">Global Animation:</strong> All
            interactive elements use globally configured animation utilities for
            cohesive transitions.
          </li>
          <li>
            <strong className="text-white">Hit-Test Philosophy:</strong> We
            use pseudo-elements to separate visual highlights from interactive
            containers, creating forgiving, clickable areas.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-white font-semibold mb-4 text-lg">
            Design System Specs
          </h4>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="aspect-video bg-zinc-900 border border-white/10 rounded-lg w-full flex items-center justify-center text-zinc-400 font-mono text-sm">
              Animation Curve Visualization
            </div>
            <div className="aspect-video bg-zinc-900 border border-white/10 rounded-lg w-full flex items-center justify-center text-zinc-400 font-mono text-sm">
              Spacing Scale
            </div>
          </div>
        </div>
      </div>
    ),
    id: "card-2",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    title: "Predictable",
  },
  {
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed">
        <p>
          We refuse the false dichotomy between speed and control. Our Dual
          Layer Architecture accommodates both prototyping and polishing modes.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-white">Composites = Velocity:</strong>{" "}
            Pre-assembled components that combine structure, styling, and logic
            for MVPs and standard use cases.
          </li>
          <li>
            <strong className="text-white">Primitives = Control:</strong>{" "}
            Thin wrappers around Base UI that enforce zero visual layout, giving
            you complete control over DOM structure.
          </li>
          <li>
            <strong className="text-white">Mix and Match:</strong> Use
            composites for speed and primitive blocks for unique custom designs
            in the same project.
          </li>
        </ul>
        <div className="pt-8">
          <h4 className="text-white font-semibold mb-4 text-lg">
            Component Architecture
          </h4>
          <div className="flex flex-col gap-4">
            <div className="h-28 bg-zinc-900/80 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center text-zinc-200 font-mono">
              Composite Layer
            </div>
            <div className="h-6 text-center text-zinc-400 font-mono text-sm">
              &darr; Adapts to &darr;
            </div>
            <div className="h-28 bg-zinc-900/80 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center text-zinc-200 font-mono">
              Primitive Layer
            </div>
          </div>
        </div>
      </div>
    ),
    id: "card-3",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    title: "Composable",
  },
];

export default MorphingDialog;
