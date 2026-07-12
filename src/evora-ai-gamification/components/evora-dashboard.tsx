'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Activity, ArrowRight, Award, BarChart3, Bell, Bot, Building2, Check, ChevronDown,
  CircleUserRound, Clock3, Coins, Flame, Gift, Globe2, GraduationCap, HandHeart,
  LayoutDashboard, Leaf, LockKeyhole, Menu, MessageSquareText, MoreHorizontal,
  Recycle, Search, ShieldCheck, ShoppingBag, Sparkles, Target, Trophy, Users, X, Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Mission = { title: string; meta: string; xp: number }

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Challenges', icon: Target },
  { label: 'Missions', icon: Check },
  { label: 'Badges', icon: Award },
  { label: 'Rewards', icon: Gift },
  { label: 'Leaderboard', icon: Trophy },
]
const kpis = [
  { label: 'EVORA Score', value: '8,420', delta: '+12.4%', icon: Sparkles },
  { label: 'Current Level', value: '24', delta: 'Steward', icon: ShieldCheck },
  { label: 'EcoCoins', value: '2,860', delta: '+340 this week', icon: Coins },
  { label: 'Active Streak', value: '18 days', delta: 'Best: 31 days', icon: Flame },
  { label: 'Global Rank', value: '#128', delta: '↑ 16 places', icon: Globe2 },
  { label: 'Badges Earned', value: '18 / 30', delta: '60% complete', icon: Award },
]
const challenges = [
  { title: 'Zero-Waste Office Sprint', tag: 'Environmental', desc: 'Reduce your team’s non-recyclable office waste by 30% over four weeks.', progress: 68, people: 1248, days: 8, reward: 750, joined: true },
  { title: 'Commute Carbon Cut', tag: 'Environmental', desc: 'Choose low-carbon transport for five workdays in a row.', progress: 42, people: 864, days: 12, reward: 420, joined: false },
  { title: 'Mentor for Impact', tag: 'Social', desc: 'Share expertise with a community climate initiative.', progress: 24, people: 326, days: 18, reward: 500, joined: false },
]
const initialMissions: Mission[] = [
  { title: 'Log today’s commute', meta: '2 min · Environmental', xp: 50 },
  { title: 'Complete the circularity quiz', meta: '5 min · Learning', xp: 80 },
  { title: 'Recognize an impact champion', meta: '1 min · Social', xp: 40 },
  { title: 'Review your team footprint', meta: '4 min · Governance', xp: 70 },
]
const leaders = [
  ['1', 'Maya Chen', 'Product · Singapore', '12,480', '+18%'],
  ['2', 'Theo Martin', 'Operations · Paris', '11,920', '+14%'],
  ['3', 'Aisha Bello', 'Finance · Lagos', '11,380', '+11%'],
  ['4', 'Daniel Kim', 'Strategy · Seoul', '10,840', '+9%'],
]
const badges = [
  { name: 'Carbon Cutter', note: 'Cut 100 kg CO₂e', icon: Leaf, earned: true },
  { name: 'Cycle Starter', note: 'Complete 10 missions', icon: Recycle, earned: true },
  { name: 'Team Catalyst', note: 'Invite 5 colleagues', icon: Users, earned: true },
  { name: 'Impact Guardian', note: '30-day streak', icon: ShieldCheck, earned: false },
  { name: 'Governance Pro', note: 'Complete ESG pathway', icon: Building2, earned: false },
]
const rewards = [
  { title: 'Plant 10 native trees', org: 'Green Canopy', cost: 1200, icon: Leaf },
  { title: 'Clean ocean plastic', org: 'Blue Current', cost: 850, icon: Recycle },
  { title: 'Learning day pass', org: 'EVORA Academy', cost: 600, icon: GraduationCap },
]

function Logo() {
  return <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Leaf className="size-5" /></span><div><div className="text-sm font-semibold tracking-[.18em]">EVORA</div><div className="text-[10px] font-medium tracking-[.28em] text-primary">AI</div></div></div>
}
function ProgressBar({ value }: { value: number }) {
  return <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-label={`${value}% complete`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${value}%` }} /></div>
}
function SectionTitle({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: string }) {
  return <div className="flex items-end justify-between gap-4"><div className="flex flex-col gap-1">{eyebrow && <p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">{eyebrow}</p>}<h2 className="text-lg font-semibold tracking-tight">{title}</h2></div>{action && <button className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">{action}<ArrowRight className="size-3.5" /></button>}</div>
}
function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('panel-glow rounded-2xl border bg-card', className)}>{children}</section>
}
function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  return <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-sidebar p-4 transition-transform lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
    <div className="flex h-14 items-center justify-between px-2"><Logo /><button className="lg:hidden" onClick={close} aria-label="Close navigation"><X className="size-5" /></button></div>
    <nav className="mt-7 flex flex-col gap-1" aria-label="Main navigation">{nav.map(({ label, icon: Icon }) => <button key={label} onClick={close} className={cn('flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent', label === 'Overview' && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground')}><Icon className="size-4" />{label}{label === 'Gamification' && <span className="ml-auto size-1.5 rounded-full bg-primary" />}</button>)}</nav>
    <div className="mt-auto flex flex-col gap-3"><div className="rounded-2xl border bg-background/50 p-4"><div className="flex items-center justify-between text-xs"><span className="text-muted-foreground">Monthly goal</span><span className="font-mono text-primary">72%</span></div><div className="mt-3"><ProgressBar value={72} /></div><p className="mt-3 text-xs leading-5 text-muted-foreground">1,420 XP to reach Impact Architect.</p></div><button className="flex items-center gap-3 rounded-xl p-2 text-left hover:bg-sidebar-accent"><span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><CircleUserRound className="size-5" /></span><span className="min-w-0"><span className="block truncate text-sm font-medium">Alex Morgan</span><span className="block truncate text-xs text-muted-foreground">Sustainability Lead</span></span><MoreHorizontal className="ml-auto size-4 text-muted-foreground" /></button></div>
  </aside>
}
function Topbar({ menu }: { menu: () => void }) {
  return <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur-xl md:px-7"><button className="lg:hidden" onClick={menu} aria-label="Open navigation"><Menu className="size-5" /></button><div className="hidden flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm text-muted-foreground md:flex md:max-w-sm"><Search className="size-4" /><span>Search challenges, rewards...</span><kbd className="ml-auto font-mono text-[10px]">⌘K</kbd></div><div className="ml-auto flex items-center gap-2"><button className="relative flex size-9 items-center justify-center rounded-xl border bg-card hover:bg-accent" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" /></button><button className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs font-medium hover:bg-accent">Global workspace<ChevronDown className="size-3.5" /></button></div></header>
}
function KpiCard({ item, index }: { item: typeof kpis[number]; index: number }) {
  const Icon = item.icon
  return <Card className="enter-up p-4" ><div className="flex items-start justify-between"><span className="flex size-9 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-4" /></span><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span></div><div className="mt-5"><p className="text-2xl font-semibold tracking-tight">{item.value}</p><div className="mt-1 flex items-center justify-between gap-2"><p className="text-xs text-muted-foreground">{item.label}</p><span className="text-[10px] text-primary">{item.delta}</span></div></div></Card>
}
function ChallengeCard({ challenge, onJoin }: { challenge: typeof challenges[number]; onJoin: () => void }) {
  return <Card className="overflow-hidden"><div className="border-b p-5"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">{challenge.tag}</span><span className="rounded-full border px-2.5 py-1 text-[10px] text-muted-foreground">Intermediate</span><span className="ml-auto flex items-center gap-1 text-[11px] text-muted-foreground"><Clock3 className="size-3.5" />{challenge.days} days left</span></div><h3 className="mt-4 text-xl font-semibold tracking-tight">{challenge.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{challenge.desc}</p></div><div className="p-5"><div className="flex items-center justify-between text-xs"><span>{challenge.progress}% complete</span><span className="text-muted-foreground">Target: 30% reduction</span></div><div className="mt-3"><ProgressBar value={challenge.progress} /></div><div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Users className="size-4" />{challenge.people.toLocaleString()} joined</span><span className="flex items-center gap-1.5"><Coins className="size-4 text-primary" />{challenge.reward} EcoCoins</span><span className="flex items-center gap-1.5"><Zap className="size-4 text-primary" />1,200 XP</span><Button className="ml-auto" size="sm" variant={challenge.joined ? 'secondary' : 'default'} onClick={onJoin}>{challenge.joined ? <><Check data-icon="inline-start" />Joined</> : <>Join challenge<ArrowRight data-icon="inline-end" /></>}</Button></div></div></Card>
}
function Missions({ done, toggle }: { done: number[]; toggle: (i: number) => void }) {
  const percent = Math.round(done.length / initialMissions.length * 100)
  return <Card className="p-5"><SectionTitle eyebrow="Daily rhythm" title="Today’s missions" action={`${done.length}/${initialMissions.length} complete`} /><div className="mt-4"><ProgressBar value={percent} /></div><div className="mt-4 flex flex-col gap-2">{initialMissions.map((mission, i) => <button key={mission.title} onClick={() => toggle(i)} className="flex items-center gap-3 rounded-xl border p-3 text-left transition-colors hover:bg-accent"><span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg border', done.includes(i) && 'border-primary bg-primary text-primary-foreground')}>{done.includes(i) ? <Check className="size-4" /> : <Target className="size-4 text-muted-foreground" />}</span><span className="min-w-0 flex-1"><span className={cn('block truncate text-sm font-medium', done.includes(i) && 'text-muted-foreground line-through')}>{mission.title}</span><span className="block text-[11px] text-muted-foreground">{mission.meta}</span></span><span className="font-mono text-[11px] text-primary">+{mission.xp} XP</span></button>)}</div></Card>
}
function Coach() {
  return <Card className="border-primary/40 p-5"><div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Bot className="size-5" /></span><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-primary">AI sustainability coach</p><h3 className="text-sm font-semibold">Your next best action</h3></div></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Your travel footprint rose 8% this month. Switching Thursday’s city meeting to rail could prevent <strong className="font-medium text-foreground">18.6 kg CO₂e</strong>.</p><button className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary">Build my low-carbon plan<ArrowRight className="size-3.5" /></button></Card>
}
function Impact() {
  const stats = [['CO₂e avoided', '384 kg'], ['Waste diverted', '126 kg'], ['Volunteer time', '18.5 h']]
  return <Card className="p-5"><SectionTitle eyebrow="Your footprint" title="ESG contribution" /><div className="mt-5 flex h-2 overflow-hidden rounded-full"><div className="w-[58%] bg-primary" /><div className="w-[27%] bg-chart-2" /><div className="w-[15%] bg-chart-3" /></div><div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground"><span>E 58%</span><span>S 27%</span><span>G 15%</span></div><div className="mt-5 grid grid-cols-3 gap-2">{stats.map(([label, value]) => <div key={label} className="rounded-xl bg-secondary p-3"><p className="text-sm font-semibold">{value}</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">{label}</p></div>)}</div></Card>
}
function Leaderboard() {
  return <Card className="overflow-hidden"><div className="p-5"><SectionTitle eyebrow="Company wide" title="Impact leaderboard" action="View all" /></div><div className="overflow-x-auto"><table className="w-full min-w-lg text-left text-sm"><thead className="border-y bg-secondary/50 text-[10px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-5 py-3 font-medium">Rank</th><th className="px-3 py-3 font-medium">Contributor</th><th className="px-3 py-3 font-medium">EVORA score</th><th className="px-5 py-3 text-right font-medium">Momentum</th></tr></thead><tbody>{leaders.map(([rank, name, dept, score, delta]) => <tr className="border-b last:border-0" key={name}><td className="px-5 py-3 font-mono text-primary">#{rank}</td><td className="px-3 py-3"><div className="font-medium">{name}</div><div className="text-[11px] text-muted-foreground">{dept}</div></td><td className="px-3 py-3 font-mono">{score}</td><td className="px-5 py-3 text-right text-xs text-primary">{delta}</td></tr>)}</tbody></table></div></Card>
}
function Badges() {
  return <Card className="p-5"><SectionTitle eyebrow="Milestones" title="Badge gallery" action="View collection" /><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">{badges.map(({ name, note, icon: Icon, earned }) => <div key={name} className={cn('flex min-h-36 flex-col items-center justify-center rounded-xl border p-3 text-center', !earned && 'opacity-45')}><span className={cn('flex size-11 items-center justify-center rounded-full bg-secondary text-muted-foreground', earned && 'bg-accent text-accent-foreground')} >{earned ? <Icon className="size-5" /> : <LockKeyhole className="size-4" />}</span><p className="mt-3 text-xs font-semibold">{name}</p><p className="mt-1 text-[10px] leading-4 text-muted-foreground">{note}</p></div>)}</div></Card>
}
function Rewards({ coins, redeem }: { coins: number; redeem: (cost: number, title: string) => void }) {
  return <Card className="p-5"><SectionTitle eyebrow="EcoCoin marketplace" title="Rewards with real impact" action={`${coins.toLocaleString()} coins available`} /><div className="mt-5 grid gap-3 md:grid-cols-3">{rewards.map(({ title, org, cost, icon: Icon }) => <div key={title} className="rounded-xl border bg-secondary/35 p-4"><div className="flex items-start justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" /></span><span className="font-mono text-xs text-primary">{cost}</span></div><h3 className="mt-5 text-sm font-semibold">{title}</h3><p className="mt-1 text-xs text-muted-foreground">Fulfilled by {org}</p><Button className="mt-4 w-full" size="sm" variant="outline" disabled={coins < cost} onClick={() => redeem(cost, title)}><Gift data-icon="inline-start" />Redeem impact</Button></div>)}</div></Card>
}
function Community() {
  return <Card className="p-5"><SectionTitle eyebrow="Live activity" title="Community pulse" /><div className="mt-5 flex flex-col gap-4">{[
    ['MC', 'Maya completed Zero-Waste Week', 'Saved 14 kg of waste · 8 min ago'], ['TK', 'Theo shared an impact story', 'Bike-to-work cohort · 24 min ago'], ['AB', 'Aisha unlocked Carbon Cutter', 'Milestone badge · 42 min ago']
  ].map(([initials, title, meta]) => <div className="flex items-center gap-3" key={title}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-[10px] text-primary">{initials}</span><div className="min-w-0"><p className="truncate text-xs font-medium">{title}</p><p className="mt-1 text-[10px] text-muted-foreground">{meta}</p></div><MessageSquareText className="ml-auto size-4 text-muted-foreground" /></div>)}</div></Card>
}

export function EvoraDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [joined, setJoined] = useState<number[]>([0])
  const [done, setDone] = useState<number[]>([0])
  const [coins, setCoins] = useState(2860)
  const [notice, setNotice] = useState('')
  const toggleMission = (i: number) => setDone((current) => current.includes(i) ? current.filter((x) => x !== i) : [...current, i])
  const redeem = (cost: number, title: string) => { setCoins((value) => value - cost); setNotice(`${title} redeemed. Your impact receipt is ready.`); setTimeout(() => setNotice(''), 3500) }
  return <div className="min-h-screen bg-background evora-grid"><Sidebar open={mobileOpen} close={() => setMobileOpen(false)} />{mobileOpen && <button className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation backdrop" />}<div className="lg:pl-64"><Topbar menu={() => setMobileOpen(true)} /><main className="mx-auto max-w-[1600px] p-4 md:p-7"><div className="flex flex-col gap-7">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-primary">Performance / Gamification</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl">Turn action into impact.</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Build better ESG habits, challenge your teams, and make every contribution measurable.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" asChild><Link href="/"><ArrowRight className="rotate-180" data-icon="inline-start" />Module home</Link></Button><Button variant="outline"><ShoppingBag data-icon="inline-start" />Reward store</Button><Button><Target data-icon="inline-start" />Explore challenges</Button></div></div>
    <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6" aria-label="Your gamification statistics">{kpis.map((item, i) => <KpiCard key={item.label} item={item} index={i} />)}</section>
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,.72fr)]"><div className="flex min-w-0 flex-col gap-5"><SectionTitle eyebrow="Featured program" title="Active challenges" action="Browse all" />{challenges.map((challenge, i) => <ChallengeCard key={challenge.title} challenge={{ ...challenge, joined: joined.includes(i) }} onJoin={() => setJoined((list) => list.includes(i) ? list : [...list, i])} />)}</div><aside className="flex flex-col gap-5"><Missions done={done} toggle={toggleMission} /></aside></div>
    <Badges /><div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]"><Leaderboard /><Rewards coins={coins} redeem={redeem} /></div>
    <footer className="flex flex-col gap-2 border-t pt-5 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>EVORA AI · Making ESG performance participatory.</span><span className="flex items-center gap-2"><ShieldCheck className="size-3.5" />Impact data verified hourly</span></footer>
  </div></main></div>{notice && <div role="status" className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl border border-primary/40 bg-popover p-4 text-sm shadow-2xl"><div className="flex items-start gap-3"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{notice}</span></div></div>}</div>
}
