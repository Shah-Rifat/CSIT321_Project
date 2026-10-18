import { FormEvent, useMemo, useState } from "react";

type IconName =
  | "dashboard"
  | "transactions"
  | "budget"
  | "wallet"
  | "settings"
  | "bell"
  | "search"
  | "plus"
  | "arrow-up"
  | "arrow-down"
  | "chevron"
  | "shopping"
  | "home"
  | "food"
  | "car"
  | "briefcase"
  | "more"
  | "x"
  | "calendar";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    transactions: <><path d="M7 7h11l-3-3" /><path d="m18 7-3 3" /><path d="M17 17H6l3 3" /><path d="m6 17 3-3" /></>,
    budget: <><path d="M4 19V9" /><path d="M10 19V5" /><path d="M16 19v-7" /><path d="M22 19H2" /></>,
    wallet: <><path d="M3 7h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13v4" /><path d="M16 13h5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.08 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.08V3h4v.08a1.7 1.7 0 0 0 1.03 1.55 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9v.01A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    "arrow-up": <><path d="m18 15-6-6-6 6" /></>,
    "arrow-down": <><path d="m6 9 6 6 6-6" /></>,
    chevron: <><path d="m9 18 6-6-6-6" /></>,
    shopping: <><path d="M6 7h14l-2 8H8L6 3H3" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10" /><path d="M9 21v-7h6v7" /></>,
    food: <><path d="M7 3v8" /><path d="M4 3v5a3 3 0 0 0 6 0V3" /><path d="M7 11v10" /><path d="M17 3v18" /><path d="M17 3c4 2 4 8 0 10" /></>,
    car: <><path d="m5 17-1 3" /><path d="m19 17 1 3" /><path d="M3 12h18l-2-6H5Z" /><path d="M5 12v5h14v-5" /><circle cx="7" cy="15" r="1" /><circle cx="17" cy="15" r="1" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3" /><path d="M3 12h18" /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    x: <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

type Transaction = {
  id: number;
  name: string;
  category: string;
  date: string;
  amount: number;
  icon: IconName;
  color: string;
};

const initialTransactions: Transaction[] = [
  { id: 1, name: "Whole Foods Market", category: "Groceries", date: "Today, 10:42 AM", amount: -84.32, icon: "shopping", color: "bg-amber-50 text-amber-700" },
  { id: 2, name: "Salary Deposit", category: "Income", date: "May 24, 9:00 AM", amount: 4250, icon: "briefcase", color: "bg-emerald-50 text-emerald-700" },
  { id: 3, name: "Greenhouse Café", category: "Dining", date: "May 23, 1:18 PM", amount: -26.8, icon: "food", color: "bg-rose-50 text-rose-600" },
  { id: 4, name: "Monthly Rent", category: "Housing", date: "May 22, 8:30 AM", amount: -1450, icon: "home", color: "bg-violet-50 text-violet-600" },
  { id: 5, name: "Metro Fuel", category: "Transport", date: "May 21, 6:12 PM", amount: -62.45, icon: "car", color: "bg-sky-50 text-sky-600" },
];

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "dashboard" },
  { label: "Transactions", icon: "transactions" },
  { label: "Budgets", icon: "budget" },
  { label: "Accounts", icon: "wallet" },
];

const budgets = [
  { name: "Groceries", spent: 428, total: 600, color: "bg-amber-400" },
  { name: "Dining out", spent: 286, total: 400, color: "bg-rose-400" },
  { name: "Transport", spent: 165, total: 350, color: "bg-sky-400" },
  { name: "Entertainment", spent: 92, total: 250, color: "bg-violet-400" },
];

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Math.abs(value));
}

function MoneyIllustration() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}money-illustration.jpg`}
      alt="Green dollar sign illustration"
      className="h-60 w-52 object-contain"
    />
  );
}

function AuthScreen({ onLogin }: { onLogin: () => void }) {
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const signupIncomplete = mode === "signup" && (!firstName.trim() || !lastName.trim() || !phone.trim());
    if (signupIncomplete || !email.trim() || !password.trim()) {
      setError(mode === "signup" ? "Complete each field to create your account." : "Enter your email and password to continue.");
      return;
    }
    onLogin();
  }

  return (
    <main className="auth-shell min-h-screen px-4 py-8 sm:px-8">
      <div className="auth-card mx-auto grid w-full max-w-[1120px] overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-emerald-950/20 lg:grid-cols-[30%_70%]">
        <section className="relative hidden min-h-[700px] overflow-hidden bg-[#fbfcf9] lg:flex lg:flex-col">
          <div className="bg-[#115a40] px-9 py-10 text-white">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#b9f227] text-xl font-black text-emerald-950">F</span>
              <span className="text-xl font-bold tracking-tight">Finora</span>
            </div>
            <p className="font-serif text-2xl leading-tight">Manage your money</p>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <MoneyIllustration />
          </div>
          <div className="bg-[#115a40] px-9 py-8">
            <p className="text-sm font-medium text-white">Plan today. Prosper tomorrow.</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-100/60">A clearer way to see, save, and spend.</p>
          </div>
        </section>

        <section className="flex min-h-[700px] items-center px-6 py-10 sm:px-14 lg:px-16">
          <div className="mx-auto w-full max-w-[600px]">
            <div className="mb-9 lg:hidden">
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-900 text-xl font-black text-[#b9f227]">F</span>
                <span className="text-xl font-bold tracking-tight text-emerald-950">Finora</span>
              </div>
            </div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[.14em] text-emerald-700">{mode === "signup" ? "Start your journey" : "Welcome back"}</p>
            <h1 className="text-4xl font-semibold tracking-[-.035em] text-slate-950">{mode === "signup" ? "Create your account" : "Log in to your account"}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">{mode === "signup" ? "Bring every part of your financial life into focus." : "Enter your details to pick up where you left off."}</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              {mode === "signup" && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    First name
                    <input autoComplete="given-name" value={firstName} onChange={(e) => { setFirstName(e.target.value); setError(""); }} placeholder="Fardin" className="auth-input" />
                  </label>
                  <label className="block text-sm font-semibold text-slate-800">
                    Last name
                    <input autoComplete="family-name" value={lastName} onChange={(e) => { setLastName(e.target.value); setError(""); }} placeholder="Shafin" className="auth-input" />
                  </label>
                </div>
              )}
              <label className="block text-sm font-semibold text-slate-800">
                Email address
                <input type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="fardin@example.com" className="auth-input" />
              </label>
              {mode === "signup" && (
                <label className="block text-sm font-semibold text-slate-800">
                  Phone number
                  <input type="tel" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(""); }} placeholder="+61 444 555 666" className="auth-input" />
                </label>
              )}
              <label className="block text-sm font-semibold text-slate-800">
                Password
                <input type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder={mode === "signup" ? "At least 8 characters" : "Enter your password"} className="auth-input" />
              </label>
              {mode === "login" && (
                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded accent-emerald-700" />
                    Remember me
                  </label>
                  <button type="button" onClick={() => setError("Password reset instructions would be sent to your email.")} className="font-semibold text-emerald-700 hover:text-emerald-900">Forgot password?</button>
                </div>
              )}
              {error && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">{error}</p>}
              <button type="submit" className="w-full rounded-xl bg-[#115a40] px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-900">{mode === "signup" ? "Create account" : "Log in"}</button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-500">
              {mode === "signup" ? "Already have an account?" : "New to Finora?"}{" "}
              <button type="button" onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(""); }} className="font-semibold text-emerald-700 hover:text-emerald-900">
                {mode === "signup" ? "Log in" : "Create an account"}
              </button>
            </p>
            <div className="mt-7 flex items-center justify-center gap-5 text-xs text-slate-400"><span>Secure by design</span><i className="h-1 w-1 rounded-full bg-slate-300" /><span>Privacy protected</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AddTransactionModal({ onClose, onAdd }: { onClose: () => void; onAdd: (transaction: Transaction) => void }) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !Number(amount)) return;
    const iconMap: Record<string, IconName> = { Groceries: "shopping", Dining: "food", Housing: "home", Transport: "car", Income: "briefcase", Other: "wallet" };
    onAdd({
      id: Date.now(),
      name: name.trim(),
      category: type === "income" ? "Income" : category,
      date: "Today, just now",
      amount: Number(amount) * (type === "expense" ? -1 : 1),
      icon: type === "income" ? "briefcase" : iconMap[category],
      color: type === "income" ? "bg-emerald-50 text-emerald-700" : "bg-lime-50 text-lime-700",
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">New record</p>
            <h2 className="text-2xl font-semibold text-slate-900">Add transaction</h2>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close"><Icon name="x" /></button>
        </div>
        <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
          {(["expense", "income"] as const).map((item) => (
            <button key={item} onClick={() => setType(item)} className={`rounded-lg py-2 text-sm font-semibold capitalize transition ${type === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>{item}</button>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Description
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Farmer's market" className="form-input" />
          </label>
          <label className="block text-sm font-medium text-slate-700">Amount
            <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span><input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="form-input pl-8" /></div>
          </label>
          {type === "expense" && <label className="block text-sm font-medium text-slate-700">Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-input">
              {["Groceries", "Dining", "Housing", "Transport", "Other"].map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>}
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">Cancel</button>
            <button type="submit" className="flex-1 rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 hover:bg-emerald-800">Add transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [active, setActive] = useState("Overview");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  const filtered = useMemo(() => transactions.filter((t) => `${t.name} ${t.category}`.toLowerCase().includes(search.toLowerCase())), [transactions, search]);
  const addedBalance = transactions.slice(initialTransactions.length).reduce((sum, item) => sum + item.amount, 0);
  const balance = 24780.56 + addedBalance;
  const income = 8420 + transactions.slice(initialTransactions.length).filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = 3160.44 + Math.abs(transactions.slice(initialTransactions.length).filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));

  if (!authenticated) {
    return <AuthScreen onLogin={() => setAuthenticated(true)} />;
  }

  const renderTransactions = (full = false) => (
    <section className="panel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{full ? "All transactions" : "Recent transactions"}</h2>
          <p className="text-sm text-slate-500">{full ? `${filtered.length} records found` : "Your latest account activity"}</p>
        </div>
        {full ? (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Icon name="search" size={17} /></span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions" className="rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500" />
          </div>
        ) : <button onClick={() => setActive("Transactions")} className="flex items-center gap-1 text-sm font-semibold text-emerald-700">View all <Icon name="chevron" size={16} /></button>}
      </div>
      <div className="divide-y divide-slate-100">
        {(full ? filtered : transactions.slice(0, 5)).map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-50/70">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${transaction.color}`}><Icon name={transaction.icon} size={19} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-800">{transaction.name}</p>
              <p className="truncate text-xs text-slate-500">{transaction.category} · {transaction.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${transaction.amount > 0 ? "text-emerald-700" : "text-slate-900"}`}>{transaction.amount > 0 ? "+" : "−"}{money(transaction.amount)}</p>
              <p className="text-xs text-slate-400">Completed</p>
            </div>
            <button className="hidden text-slate-400 sm:block" aria-label="Transaction options"><Icon name="more" size={18} /></button>
          </div>
        ))}
        {filtered.length === 0 && <div className="px-5 py-14 text-center text-sm text-slate-500">No transactions match your search.</div>}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#f5f7f5] text-slate-800">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[238px] flex-col border-r border-emerald-900/10 bg-[#103d2c] px-4 py-6 text-white lg:flex">
        <button onClick={() => setActive("Overview")} className="mb-9 flex items-center gap-3 px-2 text-left">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b9f227] text-xl font-black text-emerald-950">F</span>
          <span><span className="block text-lg font-bold tracking-tight">Finora</span><span className="block text-[10px] font-medium uppercase tracking-[.18em] text-emerald-200/60">Smart finance</span></span>
        </button>
        <nav className="space-y-1">
          {navItems.map((item) => <button key={item.label} onClick={() => setActive(item.label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${active === item.label ? "bg-white/12 text-white" : "text-emerald-100/65 hover:bg-white/5 hover:text-white"}`}><Icon name={item.icon} size={19} />{item.label}</button>)}
        </nav>
        <div className="mt-auto">
          <div className="mb-4 rounded-2xl bg-white/[.07] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#b9f227] text-emerald-950"><Icon name="budget" size={18} /></div>
            <p className="text-sm font-semibold">Monthly snapshot</p>
            <p className="mt-1 text-xs leading-relaxed text-emerald-100/60">You saved 18% more than last month.</p>
          </div>
          <button onClick={() => setActive("Settings")} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm ${active === "Settings" ? "bg-white/12 text-white" : "text-emerald-100/65"}`}><Icon name="settings" size={19} />Settings</button>
        </div>
      </aside>

      <main className="pb-24 lg:ml-[238px] lg:pb-0">
        <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200/80 bg-[#f5f7f5]/90 px-5 backdrop-blur-xl md:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900 font-black text-[#b9f227] lg:hidden">F</span>
            <div><p className="text-xs font-medium text-slate-500">Monday, May 26</p><h1 className="text-xl font-semibold tracking-tight text-slate-900">{active}</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotice(!showNotice)} className="icon-button relative" aria-label="Notifications"><Icon name="bell" size={19} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-[#8bcf17]" /></button>
            <button className="ml-1 flex items-center gap-2 rounded-xl p-1.5 pr-2 hover:bg-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-800">FS</span>
              <span className="hidden text-left md:block"><span className="block text-sm font-semibold text-slate-800">Fardin Shafin</span><span className="block text-[11px] text-slate-500">Personal account</span></span>
            </button>
          </div>
          {showNotice && <div className="absolute right-5 top-16 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"><p className="font-semibold text-slate-900">You're on track</p><p className="mt-1 text-sm text-slate-500">Your spending is 8% lower than this time last month.</p></div>}
        </header>

        <div className="mx-auto max-w-[1440px] p-5 md:p-8 lg:p-10">
          {active === "Overview" && <>
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="mb-1 text-sm font-medium text-emerald-700">Financial overview</p><h2 className="text-3xl font-semibold tracking-[-.03em] text-slate-950">Good morning, Fardin.</h2><p className="mt-1 text-sm text-slate-500">Here's how your money is doing this month.</p></div>
              <button onClick={() => setShowModal(true)} className="primary-button"><Icon name="plus" size={18} /> Add transaction</button>
            </div>
            <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-[#103d2c] p-5 text-white shadow-lg shadow-emerald-950/10">
                <div className="mb-5 flex items-center justify-between"><span className="text-sm text-emerald-100/70">Total balance</span><span className="rounded-lg bg-white/10 p-2"><Icon name="wallet" size={17} /></span></div>
                <p className="text-[28px] font-semibold tracking-tight">{money(balance)}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-[#b9f227]"><Icon name="arrow-up" size={13} /> 6.8% <span className="text-emerald-100/50">from last month</span></p>
              </div>
              {[
                { label: "Monthly income", value: income, trend: "12.4%", icon: "arrow-down" as IconName, positive: true },
                { label: "Monthly expenses", value: expenses, trend: "3.2%", icon: "arrow-up" as IconName, positive: false },
                { label: "Total saved", value: income - expenses, trend: "34.6% savings rate", icon: "budget" as IconName, positive: true },
              ].map((card) => <div key={card.label} className="panel p-5"><div className="mb-5 flex items-center justify-between"><span className="text-sm text-slate-500">{card.label}</span><span className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><Icon name={card.icon} size={17} /></span></div><p className="text-[28px] font-semibold tracking-tight text-slate-900">{money(card.value)}</p><p className={`mt-2 text-xs ${card.positive ? "text-emerald-700" : "text-rose-600"}`}>{card.trend} <span className="text-slate-400">{card.label === "Total saved" ? "" : "from last month"}</span></p></div>)}
            </section>
            <div className="mb-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]">
              <section className="panel p-5">
                <div className="mb-4 flex items-start justify-between"><div><h2 className="text-lg font-semibold text-slate-900">Cash flow</h2><p className="text-sm text-slate-500">Income and expenses over time</p></div><button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600"><Icon name="calendar" size={14} /> Last 6 months</button></div>
                <div className="mb-2 flex gap-5 text-xs"><span className="flex items-center gap-2 text-slate-500"><i className="h-2 w-2 rounded-full bg-emerald-700" />Income</span><span className="flex items-center gap-2 text-slate-500"><i className="h-2 w-2 rounded-full bg-[#b9f227]" />Expenses</span></div>
                <div className="relative h-56 w-full">
                  <div className="absolute inset-0 flex flex-col justify-between py-3">{[1, 2, 3, 4, 5].map((i) => <i key={i} className="block border-t border-dashed border-slate-100" />)}</div>
                  <svg className="relative h-full w-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                    <defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#047857" stopOpacity=".18" /><stop offset="100%" stopColor="#047857" stopOpacity="0" /></linearGradient></defs>
                    <path d="M20 175 C90 150,110 84,165 100 S260 45,320 68 S420 123,480 82 S570 25,680 42 L680 215 L20 215Z" fill="url(#area)" />
                    <path d="M20 175 C90 150,110 84,165 100 S260 45,320 68 S420 123,480 82 S570 25,680 42" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
                    <path d="M20 190 C92 175,112 145,165 158 S250 112,320 130 S410 152,480 138 S580 93,680 105" fill="none" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" strokeDasharray="7 7" />
                  </svg>
                  <div className="absolute inset-x-3 bottom-[-3px] flex justify-between text-[11px] text-slate-400">{["Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => <span key={m}>{m}</span>)}</div>
                </div>
              </section>
              <section className="panel p-5">
                <div className="mb-5 flex items-start justify-between"><div><h2 className="text-lg font-semibold text-slate-900">Monthly budget</h2><p className="text-sm text-slate-500">$971 left to spend</p></div><span className="text-xs font-semibold text-emerald-700">61% used</span></div>
                <div className="space-y-5">{budgets.slice(0, 3).map((budget) => <div key={budget.name}><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-slate-700">{budget.name}</span><span className="text-slate-500">${budget.spent} <span className="text-slate-300">/</span> ${budget.total}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${budget.color}`} style={{ width: `${budget.spent / budget.total * 100}%` }} /></div></div>)}</div>
                <button onClick={() => setActive("Budgets")} className="mt-6 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700">Manage budgets</button>
              </section>
            </div>
            {renderTransactions()}
          </>}

          {active === "Transactions" && <><div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-1 text-sm font-medium text-emerald-700">Money movement</p><h2 className="text-3xl font-semibold tracking-tight text-slate-950">Transactions</h2></div><button onClick={() => setShowModal(true)} className="primary-button"><Icon name="plus" size={18} /> Add transaction</button></div>{renderTransactions(true)}</>}

          {active === "Budgets" && <><div className="mb-7"><p className="mb-1 text-sm font-medium text-emerald-700">Spending plan</p><h2 className="text-3xl font-semibold tracking-tight text-slate-950">Monthly budgets</h2><p className="mt-1 text-sm text-slate-500">Stay on track across every category.</p></div><div className="grid gap-5 md:grid-cols-2">{budgets.map((budget) => <article key={budget.name} className="panel p-6"><div className="mb-8 flex items-start justify-between"><div><p className="text-sm text-slate-500">{budget.name}</p><p className="mt-1 text-2xl font-semibold text-slate-900">${budget.spent} <span className="text-sm font-normal text-slate-400">of ${budget.total}</span></p></div><span className="rounded-xl bg-emerald-50 p-3 text-emerald-700"><Icon name="budget" /></span></div><div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${budget.color}`} style={{ width: `${budget.spent / budget.total * 100}%` }} /></div><div className="mt-3 flex justify-between text-xs text-slate-500"><span>{Math.round(budget.spent / budget.total * 100)}% used</span><span>${budget.total - budget.spent} remaining</span></div></article>)}</div></>}

          {active === "Accounts" && <><div className="mb-7"><p className="mb-1 text-sm font-medium text-emerald-700">Connected accounts</p><h2 className="text-3xl font-semibold tracking-tight text-slate-950">Your accounts</h2></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[{ name: "Everyday Checking", num: "•••• 4832", value: balance, bg: "bg-[#103d2c] text-white" }, { name: "Rainy Day Savings", num: "•••• 1029", value: 18430.2, bg: "bg-white text-slate-900" }, { name: "Rewards Credit", num: "•••• 7754", value: -1248.64, bg: "bg-white text-slate-900" }].map((account) => <article key={account.name} className={`rounded-2xl border border-slate-200/70 p-6 shadow-sm ${account.bg}`}><div className="mb-10 flex items-center justify-between"><Icon name="wallet" /><span className="text-xs opacity-60">{account.num}</span></div><p className="text-sm opacity-60">{account.name}</p><p className="mt-1 text-2xl font-semibold">{account.value < 0 ? "−" : ""}{money(account.value)}</p></article>)}</div></>}

          {active === "Settings" && <><div className="mb-7"><p className="mb-1 text-sm font-medium text-emerald-700">Preferences</p><h2 className="text-3xl font-semibold tracking-tight text-slate-950">Settings</h2></div><section className="panel max-w-2xl p-6"><h3 className="text-lg font-semibold">Profile</h3><div className="mt-6 flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-bold text-emerald-800">FS</span><div><p className="font-semibold">Fardin Shafin</p><p className="text-sm text-slate-500">fardin@example.com</p><p className="text-sm text-slate-500">+61 444 555 666</p></div></div><hr className="my-6 border-slate-100" /><h3 className="font-semibold">Notifications</h3>{["Weekly spending summary", "Budget limit alerts", "Large transaction alerts"].map((label, i) => <label key={label} className="mt-4 flex items-center justify-between text-sm text-slate-700"><span>{label}</span><input type="checkbox" defaultChecked={i !== 2} className="h-4 w-4 accent-emerald-700" /></label>)}</section></>}
        </div>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-2xl border border-slate-200 bg-white/95 px-2 py-2 shadow-xl backdrop-blur lg:hidden">
        {navItems.map((item) => <button key={item.label} onClick={() => setActive(item.label)} className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium ${active === item.label ? "bg-emerald-50 text-emerald-800" : "text-slate-400"}`}><Icon name={item.icon} size={19} />{item.label}</button>)}
      </nav>
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onAdd={(transaction) => setTransactions((items) => [transaction, ...items])} />}
    </div>
  );
}
