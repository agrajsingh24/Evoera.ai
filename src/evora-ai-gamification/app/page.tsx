import Link from 'next/link'
import { ArrowRight, Award, Coins, Gauge, Target, Trophy } from 'lucide-react'

const features = [
  { title: 'Challenges', description: 'Join focused campaigns and turn sustainable actions into team momentum.', icon: Target },
  { title: 'Badges', description: 'Unlock visible milestones as your contribution and consistency grow.', icon: Award },
  { title: 'XP and Levels', description: 'Build experience, maintain streaks, and progress through impact levels.', icon: Gauge },
  { title: 'Rewards', description: 'Trade earned EcoCoins for benefits and verified impact rewards.', icon: Coins },
  { title: 'Leaderboards', description: 'See how individuals and teams rank across every active program.', icon: Trophy },
]

export default function Page() {
  return <main className="min-h-screen bg-background px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
    <div className="mx-auto flex max-w-[1520px] flex-col gap-10">
      <header className="flex items-center justify-between gap-4 border-b pb-5">
        <Link href="/" className="flex items-center gap-3" aria-label="EVORA gamification home">
          <span className="flex size-10 items-center justify-center rounded-xl border border-primary/50 bg-card text-primary"><Trophy className="size-5" /></span>
          <span><span className="block text-sm font-semibold tracking-[.2em]">EVORA</span><span className="block font-mono text-[9px] uppercase tracking-[.24em] text-primary">Gamification</span></span>
        </Link>
        <Link href="/gamification" className="hidden items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex">Enter module<ArrowRight className="size-4" /></Link>
      </header>

      <section className="flex flex-col gap-6 py-5 lg:flex-row lg:items-end lg:justify-between lg:py-10">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[.22em] text-primary">Gamification engine</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.045em] text-balance sm:text-6xl lg:text-7xl">Turn every action into progress.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">A dedicated module for challenges, badges, XP, rewards, and leaderboards that keeps teams engaged and moving forward.</p>
        </div>
        <Link href="/gamification" className="flex w-fit items-center gap-3 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Launch gamification<ArrowRight className="size-4" /></Link>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" aria-label="Gamification features">
        {features.map(({ title, description, icon: Icon }, index) => <article key={title} className="group flex min-h-48 flex-col justify-between rounded-2xl border border-primary/40 bg-card p-7 transition-colors hover:border-primary">
          <div className="flex items-start justify-between gap-4"><Icon className="size-8 text-primary" /><span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span></div>
          <div><h2 className="text-2xl font-semibold tracking-tight text-primary">{title}</h2><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p></div>
        </article>)}
        <Link href="/gamification" className="flex min-h-48 flex-col justify-between rounded-2xl border border-primary bg-primary p-7 text-primary-foreground transition-opacity hover:opacity-90">
          <ArrowRight className="size-8 self-end" /><div><h2 className="text-2xl font-semibold tracking-tight">Enter the engine</h2><p className="mt-3 max-w-sm text-sm leading-6 opacity-75">Start challenges, earn XP, and climb the leaderboard.</p></div>
        </Link>
      </section>
    </div>
  </main>
}
