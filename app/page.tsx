"use client";

import React, { useState } from "react";
import {
  Camera,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Send,
  HeartHandshake,
} from "lucide-react";

const CONFIG = {
  tryoutEndpoint:
    process.env.NEXT_PUBLIC_TRYOUT_FORM_ENDPOINT ||
    "https://example.com/tryout",
  sponsorEndpoint:
    process.env.NEXT_PUBLIC_SPONSOR_FORM_ENDPOINT ||
    "https://example.com/sponsor",
};

const roster = [
  { name: "Lawson Blevins", number: 13, pos: "P", bio: "Strong presence on the mound." },
  { name: "Braxton Blocker", number: 15, pos: "CF", bio: "Athletic outfielder with range." },
  { name: "Fletcher Wagoner", number: 5, pos: "C", bio: "Leader behind the plate." },
  { name: "Logan Tackett", number: 9, pos: "SS", bio: "Reliable shortstop." },
  { name: "Emmett Bailey", number: 17, pos: "2B", bio: "Quick middle infielder." },
  { name: "Brady Conn", number: 1, pos: "3B", bio: "Hard-nosed competitor." },
  { name: "Eli Lily", number: 10, pos: "1B", bio: "Reliable first baseman." },
  { name: "Grayson Blevins", number: 31, pos: "LF", bio: "Effort-driven player." },
  { name: "Emmerson Hobbs", number: 44, pos: "RF", bio: "Consistent performer." },
  { name: "Brooklyn Miller", number: 22, pos: "UTIL", bio: "Versatile athlete." },
];

const tryoutInfo = {
  team: "Ambush Baseball 10U",
  date: "April 4, 2026",
  time: "5:00 PM",
  location: "Stonecrest Baseball Fields",
  phone: "(606) 615-7516",
  email: "AmbushBC2024@gmail.com",
};

const sponsors = [
  { name: "Community Partner", tier: "Title Sponsor", initials: "CP" },
  { name: "Regional Business", tier: "Gold Sponsor", initials: "RB" },
  { name: "Local Supporter", tier: "Silver Sponsor", initials: "LS" },
  { name: "Booster Partner", tier: "Community Sponsor", initials: "BP" },
];

const pages = ["Home", "Roster", "Tryouts", "Sponsors", "Profiles"];

async function submitForm(endpoint: string, payload: Record<string, string>) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed");
}

function Logo() {
  return (
    <div className="flex items-center gap-4">
      <img
        src="/logo.png"
        alt="Ambush Baseball Logo"
        className="h-16 w-auto object-contain drop-shadow-lg"
      />
      <div className="leading-tight">
        <div className="text-xs uppercase tracking-[0.25em] text-red-300 font-bold">
          Ambush
        </div>
        <div className="text-lg font-black uppercase">Baseball</div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
        active ? "bg-red-600 text-white" : "bg-white/10 text-white hover:bg-white/15"
      }`}
    >
      {label}
    </button>
  );
}

function Photo({ number }: { number: number }) {
  return (
    <div className="flex h-44 items-center justify-center bg-slate-900 border-b border-white/10">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <Camera className="text-slate-500" />
        </div>
        <div className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
          Player Photo
        </div>
        <div className="mt-1 text-sm font-bold text-white">#{number}</div>
      </div>
    </div>
  );
}

function Footer({ setPage }: { setPage: (page: string) => void }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Building athletes the right way in Eastern Kentucky with structure,
            accountability, and the Ambush standard.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
            Navigation
          </div>
          <div className="mt-3 space-y-2">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="block text-sm text-slate-300 transition hover:text-white"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Phone size={14} /> {tryoutInfo.phone}
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} /> {tryoutInfo.email}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> Eastern Kentucky
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ setPage }: { setPage: (page: string) => void }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="inline-flex rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.25em] text-red-200">
            The Ambush Way
          </div>
          <h1 className="mt-5 text-4xl font-black uppercase sm:text-5xl">
            Ambush Baseball
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            Eastern Kentucky travel baseball program built around structure,
            accountability, player development, and competitive growth.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => setPage("Tryouts")}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              View Tryouts
            </button>
            <button
              onClick={() => setPage("Roster")}
              className="rounded-xl bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Explore Roster
            </button>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
            Program Snapshot
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["10", "Loaded Players"],
              ["5", "Core Pages"],
              ["1", "Live System"],
              ["KY", "Regional Focus"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
              >
                <div className="text-2xl font-black text-white">{num}</div>
                <div className="mt-1 text-sm text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RosterPage() {
  const [query, setQuery] = useState("");
  const filtered = roster.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.pos.toLowerCase().includes(query.toLowerCase()) ||
      String(p.number).includes(query)
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="text-3xl font-black uppercase">Roster</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search player or position"
        className="mt-5 w-full rounded-2xl border border-white/10 bg-white/10 p-3 text-white outline-none placeholder:text-slate-500"
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        {filtered.map((p) => (
          <div
            key={p.name}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            <Photo number={p.number} />
            <div className="p-4">
              <div className="font-bold text-white">{p.name}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-red-300">
                {p.pos}
              </div>
              <div className="mt-3 text-sm text-slate-400">{p.bio}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TryoutsPage() {
  const [form, setForm] = useState({
    player: "",
    parent: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(CONFIG.tryoutEndpoint, {
        type: "tryout_interest",
        team: tryoutInfo.team,
        player: form.player,
        parent: form.parent,
        email: form.email,
        phone: form.phone,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-red-600/10 to-blue-700/10 p-6">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
            Tryout Info
          </div>
          <h2 className="mt-3 text-3xl font-black uppercase">{tryoutInfo.team}</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-300">
            <div><span className="font-bold text-white">Date:</span> {tryoutInfo.date}</div>
            <div><span className="font-bold text-white">Time:</span> {tryoutInfo.time}</div>
            <div><span className="font-bold text-white">Location:</span> {tryoutInfo.location}</div>
            <div><span className="font-bold text-white">Phone:</span> {tryoutInfo.phone}</div>
            <div><span className="font-bold text-white">Email:</span> {tryoutInfo.email}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <Send className="h-5 w-5 text-red-300" />
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
              Registration Form
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-black uppercase">Register Interest</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              value={form.player}
              onChange={(e) => setForm({ ...form, player: e.target.value })}
              placeholder="Player Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <input
              value={form.parent}
              onChange={(e) => setForm({ ...form, parent: e.target.value })}
              placeholder="Parent Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-2xl bg-red-600 p-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting..." : "Submit Registration"}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              Registration submitted successfully.
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Submission failed. Add your real form endpoint later in Vercel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SponsorsPage() {
  const [form, setForm] = useState({
    business: "",
    contact: "",
    email: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(CONFIG.sponsorEndpoint, {
        type: "sponsor_inquiry",
        business: form.business,
        contact: form.contact,
        email: form.email,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h2 className="text-3xl font-black uppercase">Sponsors</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {sponsors.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900 text-lg font-black text-white">
                  {s.initials}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
                    {s.tier}
                  </div>
                  <div className="mt-1 font-bold text-white">{s.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <HeartHandshake className="h-5 w-5 text-red-300" />
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
              Sponsor Inquiry
            </div>
          </div>
          <h3 className="mt-3 text-2xl font-black uppercase">Become a Partner</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Business Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <input
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="Contact Name"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 p-3 text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-2xl bg-red-600 p-3 font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending..." : "Send Sponsor Inquiry"}
            </button>
          </form>

          {status === "success" && (
            <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              Sponsor inquiry submitted successfully.
            </div>
          )}

          {status === "error" && (
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Submission failed. Add your real sponsor endpoint later in Vercel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilesPage() {
  const [player, setPlayer] = useState(roster[0]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">
            Player List
          </div>
          <div className="mt-4 space-y-2">
            {roster.map((p) => (
              <button
                key={p.name}
                onClick={() => setPlayer(p)}
                className={`block w-full rounded-2xl p-3 text-left transition ${
                  player.name === p.name
                    ? "bg-red-600 text-white"
                    : "bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                #{p.number} {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <Photo number={player.number} />
          <div className="p-6">
            <h3 className="text-3xl font-black uppercase">{player.name}</h3>
            <div className="mt-3 rounded-xl bg-red-600/20 px-3 py-2 inline-block text-xs font-bold uppercase tracking-[0.25em] text-red-200">
              {player.pos}
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400">
              {player.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [page, setPage] = useState("Home");

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Logo />
          <div className="flex flex-wrap gap-2">
            {pages.map((p) => (
              <NavButton
                key={p}
                label={p}
                active={page === p}
                onClick={() => setPage(p)}
              />
            ))}
          </div>
        </div>
      </header>

      {page === "Home" && <HomePage setPage={setPage} />}
      {page === "Roster" && <RosterPage />}
      {page === "Tryouts" && <TryoutsPage />}
      {page === "Sponsors" && <SponsorsPage />}
      {page === "Profiles" && <ProfilesPage />}

      <Footer setPage={setPage} />
    </div>
  );
}