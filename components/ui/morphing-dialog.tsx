"use client";

import type { DialogRootActions } from "@base-ui/react/dialog";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Eye,
  Gamepad2,
  Layers,
  Mountain,
  PlusIcon,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
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
import { AnimatedHikeCard, Stat } from "@/components/ui/card-25";

export interface CardItem {
  id: string;
  title: string;
  image: string;
  images: string[];
  stats: Stat[];
  description: string;
  content: React.ReactNode;
}

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
    <div className="w-full">
      <LayoutGroup>
        {/* Grid of AnimatedHikeCards triggers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto px-2 sm:px-4">
          {displayItems.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-container-${item.id}`}
              className="w-full flex justify-center"
              style={{
                opacity: activeItem?.id === item.id && isOpen ? 0 : 1,
                pointerEvents: activeItem?.id === item.id && isOpen ? "none" : "auto",
              }}
            >
              <AnimatedHikeCard
                title={item.title}
                images={item.images}
                stats={item.stats}
                description={item.description}
                onClick={(e) => {
                  e?.preventDefault();
                  handleOpen(item);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Morphing Modal Dialog */}
        <Dialog
          actionsRef={actionsRef}
          onOpenChange={handleClose}
          open={isOpen}
        >
          <AnimatePresence mode="popLayout">
            {isOpen && activeItem && (
              <DialogPortal keepMounted>
                <DialogBackdrop className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md" />
                <DialogViewport
                  className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6 overflow-y-auto"
                  hidden={false}
                >
                  <DialogPopup
                    className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-black/15 dark:border-white/20 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white shadow-2xl my-auto"
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
                    {/* Fixed Close Button at Top Right */}
                    <DialogClose
                      className="absolute right-4 top-4 z-30"
                      render={
                        <Button
                          className="rounded-full shadow-lg bg-black/70 hover:bg-black/95 text-white border border-white/20 p-2 cursor-pointer transition-transform hover:scale-105"
                          size="icon"
                          variant="secondary"
                        >
                          <X size={18} />
                        </Button>
                      }
                    />

                    {/* Scrollable Container with Smooth Touch & Mouse Scrolling */}
                    <div className="w-full h-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-950 focus:outline-none">
                      <motion.div
                        animate={{ opacity: 1 }}
                        className="flex flex-col min-h-full pb-12"
                        exit={{ opacity: 0 }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Modal Hero Banner - Square Aspect Ratio Framed */}
                        <div className="relative aspect-square sm:aspect-[16/9] max-h-72 sm:max-h-80 w-full shrink-0 overflow-hidden bg-zinc-900 border-b border-white/10">
                          <motion.div
                            className="w-full h-full"
                            layoutId={`image-container-${activeItem.id}`}
                          >
                            <img
                              alt={activeItem.title}
                              className="h-full w-full object-cover"
                              src={activeItem.image}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                          </motion.div>
                        </div>

                        {/* Modal Body Content - Standardized Text Spacing & Uniform Gaps */}
                        <div className="flex flex-col p-6 sm:p-8 justify-start text-left space-y-6">
                          {/* Modal Title & Stats */}
                          <div className="space-y-3">
                            <DialogTitle
                              className="text-2xl sm:text-4xl font-bold text-white tracking-tight"
                              render={
                                <motion.h2 layoutId={`title-${activeItem.id}`}>
                                  {activeItem.title}
                                </motion.h2>
                              }
                            />
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              {activeItem.stats.map((st, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono bg-white/[0.06] border border-white/10 text-zinc-300"
                                >
                                  {st.icon}
                                  <span>{st.label}</span>
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Scrollable Rich Body - Uniform Paragraph & List Spacing */}
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.15 }}
                            className="pt-2 text-zinc-300 leading-relaxed font-sans space-y-6"
                          >
                            {activeItem.content}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
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

const ITEMS: CardItem[] = [
  {
    id: "card-9-to-fight",
    title: "9 - TO - FIGHT",
    image:
      "/PNG/Game Seed25.png",
    images: [
      "/PNG/Game Seed25.png",
      "/PNG/image 34.png",
      "/PNG/image 31.png",
    ],
    stats: [
      { icon: <Gamepad2 className="h-3.5 w-3.5" />, label: "UE5 2.5D" },
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Comedy Shooter" },
      { icon: <Clock className="h-3.5 w-3.5" />, label: "10-Day Incubation" },
    ],
    description:
      "Top-down 2.5D comedy shooter where corporate grind turns into chaotic office warfare using improvised supplies.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          Created during Indonesia&apos;s largest game competition and incubation program organized by the Ministry of Creative Economy (~10 days). In this top-down 2.5D comedy shooter, the corporate grind turns into chaotic office warfare.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">Top-Down 2.5D Controls:</strong> Programmed character locomotion, aiming vectors, and physics collisions in Unreal Engine 5.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Improvised Office Weapons:</strong> Designed chaotic weapon mechanics using everyday office supplies (staplers, tape dispensers, keyboard projectiles).
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Team Sabotage Mechanics:</strong> Implemented player sabotage interactions and corporate rank progression to claim &ldquo;Employee of the Month&rdquo;.
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Incubation Workflow & Technical Highlights
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">01. 2.5D LOCOMOTION</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Smooth camera tracking and 360-degree top-down aim offset calculation in C++ & Blueprint.</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">02. COMBAT PHYSICS</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Improvised weapon trace detection and recoil impulse response system.</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">03. INCUBATION DELIVERABLE</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Delivered a fully playable 2.5D game prototype under strict 10-day sprint milestones.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-bubble-cuts",
    title: "BUBBLE CUTS",
    image:
      "/PNG/bubble1.png",
    images: [
      "/PNG/bubble1.png",
      "/PNG/bubble2.png",
      "/PNG/Game Jam25.png",
    ],
    stats: [
      { icon: <Gamepad2 className="h-3.5 w-3.5" />, label: "Rhythm Action" },
      { icon: <Clock className="h-3.5 w-3.5" />, label: "48-Hour Jam" },
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Spacebar Timing" },
    ],
    description:
      "Rhythm action game created in 48 hours for Global Game Jam 2025 under the theme 'Bubble'.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          Completed in just 48 hours during Global Game Jam 2025! Bubi fights monsters with her secret weapon: bubble breathing technique! Players press spacebar in sync to expand bubbles and strike incoming monsters.
        </p>

        {/* itch.io Store Direct CTA Banner */}
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-950/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-red-950/50">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider block">OFFICIAL ITCH.IO PAGE</span>
            <p className="text-sm text-white font-bold">Bubble Cuts - GGJ 2025</p>
            <p className="text-xs text-zinc-400">Playable Web & Desktop Release on itch.io</p>
          </div>
          <a
            href="https://spydev.itch.io/bubble-cuts"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-bold shadow-md shadow-red-600/30 transition-all hover:scale-105"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Play on itch.io</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">Precision Rhythm Windows:</strong> Programmed spacebar input timing detection linked to audio beats and visual expansion cues.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Dynamic Bubble Scaling:</strong> Created reactive bubble expansion feedback proportional to player hit accuracy (Perfect, Good, Miss).
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">48-Hour Rapid Sprint:</strong> Collaborated with artists and audio designers under predetermined game jam theme constraints.
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Rhythm System Specifications
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">INPUT TIMING ENGINE</span>
              <p className="text-xs text-zinc-400 leading-relaxed">Deterministic millisecond input window calculations ensuring responsive rhythm battle feedback.</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">VISUAL EXPANSION SHADER</span>
              <p className="text-xs text-zinc-400 leading-relaxed">Dynamic bubble scaling material reacting synchronously with timing accuracy state changes.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-phone-mechanics",
    title: "13TH BALL: THE NIGHTMARE SHIFT",
    image:
      "/PNG/13ball1.png",
    images: [
      "/PNG/13ball1.png",
      "/PNG/13ball2.png",
      "/PNG/13ball3.png",
    ],
    stats: [
      { icon: <Terminal className="h-3.5 w-3.5" />, label: "C++ & Blueprint" },
      { icon: <Layers className="h-3.5 w-3.5" />, label: "UMG / Slate" },
      { icon: <Gamepad2 className="h-3.5 w-3.5" />, label: "13th Ball on Steam" },
    ],
    description:
      "Simulated in-game smartphone subsystem engineered for '13th Ball: The Nightmare Shift' on Steam, featuring messaging, inbox panel, and real-time alerts.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          Engineered a comprehensive &lsquo;Phone&rsquo; mechanic simulating a smartphone inside Unreal Engine 5 at Bumi Studio for horror game <strong>13th Ball: The Nightmare Shift</strong>. Features dynamic messaging, inbox list views, and real-time pop-up notification alerts.
        </p>

        {/* Steam Store Direct CTA Banner */}
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-blue-950/50">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">OFFICIAL STEAM STORE PAGE</span>
            <p className="text-sm text-white font-bold">13th Ball: The Nightmare Shift</p>
            <p className="text-xs text-zinc-400">Developed & Published by Bumi Studio • Available on Steam</p>
          </div>
          <a
            href="https://store.steampowered.com/app/3855500/13th_Ball_The_Nightmare_Shift/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Gamepad2 className="h-4 w-4" />
            <span>Open Steam Store</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">Message Struct Data Architecture:</strong> Incoming messages are encapsulated in a custom C++ struct containing Sender Name, Message Body, Timestamp, and Read Status.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Dynamic Message List Source:</strong> Structured array acting as the unified data provider for real-time UMG UI data binding.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">3 Interconnected UI Modules:</strong>
            <ul className="list-circle pl-5 mt-2 space-y-1 text-zinc-400 text-xs sm:text-sm">
              <li>1. Notification Alert: Informs player of unread incoming texts.</li>
              <li>2. Inbox Panel: Displays scrollable list of received messages.</li>
              <li>3. Message Preview: Shows full content of selected conversation.</li>
            </ul>
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Architecture Blueprint & Modules
          </h4>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">01. NOTIFICATION</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Informs player of unread incoming text</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">02. INBOX PANEL</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Displays scrollable list of conversations</p>
            </div>
            <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-4 text-center space-y-1">
              <span className="text-xs font-mono text-zinc-400 block font-semibold">03. PREVIEW CARD</span>
              <p className="text-xs text-zinc-300 leading-relaxed">Shows complete message body and sender data</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-last-breath",
    title: "LAST BREATH PROTOCOL",
    image:
      "/PNG/gamejam26.png",
    images: [
      "/PNG/gamejam26.png",
      "/PNG/gamejam261.png",
      "/PNG/gamejam262.png",
    ],
    stats: [
      { icon: <Mountain className="h-3.5 w-3.5" />, label: "Sci-Fi Survival" },
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Oxygen System" },
      { icon: <Terminal className="h-3.5 w-3.5" />, label: "Unit T-47" },
    ],
    description:
      "Sci-fi survival game focusing on exploration, oxygen management, system repairs, and environmental hazards.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          In <em>The Last Breath Protocol</em>, the player takes on the role of Unit T-47, a bio-engineered tiger explorer awakening from cryosleep amidst spaceship ruins following a cosmic catastrophe.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">Oxygen Survival Depletion:</strong> Real-time oxygen meter depletion system requiring resource management and environmental oxygen refills.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Interactive Ship Repairs:</strong> Programmed object grabbing (<code className="text-xs bg-zinc-900 px-1.5 py-0.5 rounded border border-white/10">G</code> key) and repair triggers (<code className="text-xs bg-zinc-900 px-1.5 py-0.5 rounded border border-white/10">E</code> key prompts).
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Toxic Gas Hazards:</strong> Built environmental hazards causing toxic gas leaks and ship system failures requiring fast tactical responses.
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Core Gameplay Mechanics
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">SHIP REPAIR SYSTEM</span>
              <p className="text-xs text-zinc-400 leading-relaxed">Time-sensitive interaction mechanics to fix failing oxygen generators and propulsion thrusters.</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 space-y-2">
              <span className="text-xs font-mono text-white font-semibold">ENVIRONMENTAL THREATS</span>
              <p className="text-xs text-zinc-400 leading-relaxed">Dynamic toxic gas leaks causing rapid health deterioration if unaddressed.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-water-simulation",
    title: "WATER SIMULATION",
    image:
      "/PNG/water.png",
    images: [
      "/PNG/water.png",
      "/PNG/image 943.png",
      "/PNG/image 942.png",
    ],
    stats: [
      { icon: <Layers className="h-3.5 w-3.5" />, label: "UE5 Shader" },
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Flow Maps" },
      { icon: <Eye className="h-3.5 w-3.5" />, label: "Dynamic Depth" },
    ],
    description:
      "Stylised dynamic water material system in Unreal Engine 5 using complex shader techniques.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          Created a stylised water material in Unreal Engine 5 using a complex material graph to produce a dynamic and immersive visual representation of water.
        </p>

        {/* LinkedIn Video Demo CTA Banner */}
        <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-blue-950/50">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">DEMO & TECHNICAL SHOWCASE</span>
            <p className="text-sm text-white font-bold">Stylized Water Shader - Perlin Noise</p>
            <p className="text-xs text-zinc-400">Watch video breakdown and material graph preview on LinkedIn</p>
          </div>
          <a
            href="https://www.linkedin.com/posts/ahyad_unrealengine-perlinnoise-stylized-activity-7399864967447117825-XnJN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEV57xUBCFVvoH_X41yxog6vkCVOp9nlt4E"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            <Eye className="h-4 w-4" />
            <span>Watch on LinkedIn</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">Custom Flow Map Panning:</strong> Vector direction flow map movement creating realistic liquid surface panning.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Layered Foam System:</strong> Multi-layered shoreline foam generation and edge highlight distance fields.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Dynamic Depth Color:</strong> Smooth depth color transitions between shallow shorelines and deep water bodies.
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Exposed Shader Parameters
          </h4>
          <div className="grid gap-3 sm:grid-cols-2 text-xs font-mono text-zinc-300">
            <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">• OceanFoam: 60.0</div>
            <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">• OceanSpeed: 0.3</div>
            <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">• DepthWater: 300.0</div>
            <div className="bg-zinc-900/80 p-3 rounded-lg border border-white/10">• Realtime Material Customization</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "card-ui-ux-branding",
    title: "INTEGRATED LAB & BRAND",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    ],
    stats: [
      { icon: <Layers className="h-3.5 w-3.5" />, label: "Figma UI/UX" },
      { icon: <Eye className="h-3.5 w-3.5" />, label: "{/} Lab Brand" },
      { icon: <Zap className="h-3.5 w-3.5" />, label: "Social Feed" },
    ],
    description:
      "Complete visual identity branding ({/} lab), Instagram/TikTok feed poster designs, and web/mobile UI/UX apps.",
    content: (
      <div className="space-y-5 text-zinc-300 leading-relaxed font-sans">
        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
          Designed complete visual identity branding for Integrated Laboratory System (I-Lab), promotional social media feed designs for events, and mobile/web UI/UX apps.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm sm:text-base text-zinc-300">
          <li className="leading-relaxed">
            <strong className="text-white">I-Lab Logo System:</strong> Code bracket symbol <code className="text-xs bg-zinc-900 px-1.5 py-0.5 rounded border border-white/10">{`{/}`}</code> combined with candle flame motif across dark and light app cards.
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Social Media Feed Design:</strong> Promotional posters for Informatics Expo, Ghost Runner, World Laboratory Day, and Upgrading UI/UX Event on Instagram & TikTok (@labit.umm).
          </li>
          <li className="leading-relaxed">
            <strong className="text-white">Mobile & Web UI/UX:</strong> Sumba Island travel app, Kekita donation platform, and Wukong game store interfaces.
          </li>
        </ul>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-white font-semibold text-base sm:text-lg tracking-tight">
            Design Tools & Software Stack
          </h4>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 font-semibold">Figma</span>
            <span className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 font-semibold">Adobe Photoshop</span>
            <span className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 font-semibold">Adobe Illustrator</span>
            <span className="px-3 py-1.5 bg-zinc-900 border border-white/10 rounded-lg text-zinc-300 font-semibold">Brand Identity</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default MorphingDialog;
