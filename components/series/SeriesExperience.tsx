"use client";

import { Suspense, useCallback, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { viewerProfiles, type ProfileId, type SectionId } from "@/data/series";
import type { Project } from "@/data/projects";
import { SmoothScrollProvider, useSmoothScroll } from "./hooks/smoothScroll";
import CustomCursor from "./CustomCursor";
import OpeningSequence from "./OpeningSequence";
import ProfileSelector from "./ProfileSelector";
import Navbar from "./Navbar";
import Hero from "./Hero";
import ContinueWatching from "./ContinueWatching";
import Scene from "./Scene";
import About from "./About";
import Seasons from "./Seasons";
import Originals from "./Originals";
import TopPicks from "./TopPicks";
import Skills from "./Skills";
import Moments from "./Moments";
import ResumeSection from "./ResumeViewer";
import FinalCTA from "./FinalCTA";
import { EASE } from "./fx";

// Overlays are only needed on demand — keep them out of the first load.
const PlayIntro = dynamic(() => import("./PlayIntro"), { ssr: false });
const ProjectModal = dynamic(() => import("./ProjectModal"), { ssr: false });
const ResumeModal = dynamic(() => import("./ResumeModal"), { ssr: false });

type Stage = "opening" | "profiles" | "home";
const STORAGE_KEY = "ishwar-series-profile";

function readStoredProfile(): ProfileId | null {
  try {
    const v = sessionStorage.getItem(STORAGE_KEY);
    return viewerProfiles.some((p) => p.id === v) ? (v as ProfileId) : null;
  } catch {
    return null;
  }
}

export default function SeriesExperience() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

/* SERIES-EXP-MARKER */

function Series() {
  const [stage, setStage] = useState<Stage>("opening");
  const [profileId, setProfileId] = useState<ProfileId>("ishwar");
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  const order = viewerProfiles.find((p) => p.id === profileId)!.order;

  // Returning visitors (this session) skip straight to home. Read after mount
  // so the server/client first render stay identical (no hydration mismatch).
  // `?view=home` / `#home` is a shareable deep link that skips the intro.
  useEffect(() => {
    const url = new URL(window.location.href);
    const forceHome = url.searchParams.get("view") === "home" || url.hash === "#home";
    const stored = readStoredProfile();
    if (stored) setProfileId(stored);
    if (stored || forceHome) setStage("home");
  }, []);

  useEffect(() => {
    if (stage === "home") return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const pickProfile = useCallback(
    (id: ProfileId) => {
      setProfileId(id);
      try {
        sessionStorage.setItem(STORAGE_KEY, id);
      } catch {
        /* storage unavailable — profile simply won't persist */
      }
      if (stage !== "home") {
        window.scrollTo(0, 0);
        setStage("home");
      } else {
        const p = viewerProfiles.find((v) => v.id === id)!;
        setToast(`Now watching as ${p.name} — ${p.blurb.toLowerCase()}`);
        scrollTo(0, { offset: 0 });
      }
    },
    [stage, scrollTo],
  );

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Seasons />,
    originals: <Originals onOpen={setProject} />,
    picks: <TopPicks />,
    skills: <Skills />,
    moments: <Moments />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <div className="series-grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === "opening" && <OpeningSequence key="opening" onDone={() => setStage("profiles")} />}
        {stage === "profiles" && <ProfileSelector key="profiles" onPick={pickProfile} />}
      </AnimatePresence>

      {stage === "home" && (
        <motion.div initial={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: EASE }}>
          <Navbar order={order} profileId={profileId} onSwitch={pickProfile} />
          <div>
            <Hero key={`hero-${profileId}`} onPlay={() => setPlaying(true)} onResume={() => setResumeOpen(true)} />
            <ContinueWatching order={order} />
            {order.map((id) => (
              <Scene key={id} id={id} className={id === "originals" ? "!py-0 sm:!py-0" : ""}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage("opening")} />
          </div>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className="series-glass fixed bottom-6 left-1/2 z-[150] w-[min(92vw,420px)] -translate-x-1/2 rounded-xl px-5 py-3 text-center text-sm text-bone"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

