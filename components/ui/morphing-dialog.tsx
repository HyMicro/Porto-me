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
    id: "card-1",
    title: "Phone Mechanics System",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed font-sans">
        <p className="text-base text-zinc-200">
          Created an in-game simulated smartphone mechanic in Unreal Engine featuring dynamic messaging, an interactive inbox panel, and real-time pop-up notifications.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
          <li>
            <strong className="text-white">Message Struct Data Model:</strong> Each incoming message stores sender name, content string, timestamp, and boolean read status.
          </li>
          <li>
            <strong className="text-white">Message List Source:</strong> All messages gather in a dynamic Message List array serving as the single source of truth.
          </li>
          <li>
            <strong className="text-white">3-Part UI Architecture:</strong> 1) Notification popup alerts player on new message, 2) Inbox panel lists incoming conversations, 3) Preview panel displays full selected message text.
          </li>
        </ul>
        <div className="pt-6">
          <h4 className="text-white font-semibold mb-3 text-lg font-sans">
            Architecture Blueprint
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-3 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block">01. NOTIFICATION</span>
              <p className="text-xs text-zinc-300">Informs player of unread incoming text</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-3 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block">02. INBOX PANEL</span>
              <p className="text-xs text-zinc-300">Displays scrollable list of conversations</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-lg p-3 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block">03. PREVIEW CARD</span>
              <p className="text-xs text-zinc-300">Shows complete message body and sender data</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-2",
    title: "Last Breath Survival Systems",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed font-sans">
        <p className="text-base text-zinc-200">
          In <em>The Last Breath Protocol</em>, players control bio-engineered tiger Unit T-47 awakening on a damaged spaceship amidst cosmic destruction.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
          <li>
            <strong className="text-white">Oxygen Depletion Logic:</strong> Real-time oxygen meter mechanics requiring resource management and environmental oxygen refills.
          </li>
          <li>
            <strong className="text-white">Interaction Mechanics:</strong> Object grabbing (G key), system repair triggers (E key prompts), and item usage.
          </li>
          <li>
            <strong className="text-white">Environmental Hazards:</strong> Toxic gas leaks and system failure events requiring fast repair responses under pressure.
          </li>
        </ul>
        <div className="pt-6">
          <h4 className="text-white font-semibold mb-3 text-lg font-sans">
            Core Gameplay Mechanics
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-zinc-900 border border-white/10 rounded-lg p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">SHIP REPAIR SYSTEM</span>
              <p className="text-xs text-zinc-400">Time-sensitive interaction mechanics to fix failing oxygen generators and propulsion thrusters.</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-lg p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">ENVIRONMENTAL THREATS</span>
              <p className="text-xs text-zinc-400">Dynamic toxic gas leaks causing rapid health deterioration if unaddressed.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-3",
    title: "Stylised Water Shader System",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed font-sans">
        <p className="text-base text-zinc-200">
          Engineered a custom stylised water material shader in Unreal Engine 5 using a complex material graph to achieve vibrant liquid aesthetics.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
          <li>
            <strong className="text-white">Custom Flow Map Panning:</strong> Vector direction flow maps creating realistic directional water currents.
          </li>
          <li>
            <strong className="text-white">Distance-Field Foam Layers:</strong> Layered foam generation and edge highlight distance fields around shoreline collisions.
          </li>
          <li>
            <strong className="text-white">Dynamic Depth Color:</strong> Smooth gradient color transitions between shallow shore water and deep ocean depths.
          </li>
        </ul>
        <div className="pt-6">
          <h4 className="text-white font-semibold mb-3 text-lg font-sans">
            Exposed Material Parameters
          </h4>
          <div className="grid gap-2 sm:grid-cols-2 text-xs font-mono text-zinc-300">
            <div className="bg-zinc-900/80 p-2.5 rounded border border-white/10">• OceanFoam: 60.0</div>
            <div className="bg-zinc-900/80 p-2.5 rounded border border-white/10">• OceanSpeed: 0.3</div>
            <div className="bg-zinc-900/80 p-2.5 rounded border border-white/10">• DepthWater: 300.0</div>
            <div className="bg-zinc-900/80 p-2.5 rounded border border-white/10">• Realtime Wave Customization</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-4",
    title: "Integrated Lab Branding & UI/UX",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    content: (
      <div className="space-y-4 text-zinc-300 leading-relaxed font-sans">
        <p className="text-base text-zinc-200">
          Designed complete visual identity for Integrated Laboratory System (I-Lab), promotional social media feed designs, and mobile/web UI/UX.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-300">
          <li>
            <strong className="text-white">I-Lab Logo System:</strong> Code bracket symbol <code>{`{/}`}</code> combined with candle flame motif across dark and light app cards.
          </li>
          <li>
            <strong className="text-white">Social Media Feed Design:</strong> Promotional posters for Informatics Expo, Ghost Runner, World Laboratory Day, and UI/UX Events on Instagram & TikTok.
          </li>
          <li>
            <strong className="text-white">Mobile & Web UI/UX:</strong> Sumba Island travel app, Kekita donation platform, and Wukong game store interfaces.
          </li>
        </ul>
        <div className="pt-6">
          <h4 className="text-white font-semibold mb-3 text-lg font-sans">
            Design Stack
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded text-zinc-300">Figma</span>
            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded text-zinc-300">Adobe Photoshop</span>
            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded text-zinc-300">Adobe Illustrator</span>
            <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded text-zinc-300">Brand Systems</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default MorphingDialog;
