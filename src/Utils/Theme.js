export const getTheme = (id) => {
  const themes = [
    { border: "border-violet", bg: "bg-violet-subtle", color: "#8B4CF7" },
    { border: "border-purple", bg: "bg-purple-subtle", color: "#A855F7" },
    { border: "border-fuchsia", bg: "bg-fuchsia-subtle", color: "#D946EF" },
    { border: "border-pink", bg: "bg-pink-subtle", color: "#EC4899" },
    { border: "border-rose", bg: "bg-rose-subtle", color: "#F43F5E" },

    { border: "border-red", bg: "bg-red-subtle", color: "#EF4444" },
    { border: "border-orange", bg: "bg-orange-subtle", color: "#F97316" },
    { border: "border-amber", bg: "bg-amber-subtle", color: "#F0A855" },
    { border: "border-yellow", bg: "bg-yellow-subtle", color: "#EAB308" },

    { border: "border-lime", bg: "bg-lime-subtle", color: "#84CC16" },
    { border: "border-green", bg: "bg-green-subtle", color: "#22C55E" },
    { border: "border-emerald", bg: "bg-emerald-subtle", color: "#10B981" },
    { border: "border-teal", bg: "bg-teal-subtle", color: "#14B8A6" },

    { border: "border-cyan", bg: "bg-cyan-subtle", color: "#06B6D4" },
    { border: "border-sky", bg: "bg-sky-subtle", color: "#0EA5E9" },
    { border: "border-blue", bg: "bg-blue-subtle", color: "#3B82F6" },
    { border: "border-indigo", bg: "bg-indigo-subtle", color: "#6366F1" },

    { border: "border-slate", bg: "bg-slate-subtle", color: "#64748B" },
    { border: "border-gray", bg: "bg-gray-subtle", color: "#6B7280" },
    { border: "border-zinc", bg: "bg-zinc-subtle", color: "#71717A" },
    { border: "border-neutral", bg: "bg-neutral-subtle", color: "#737373" },
    { border: "border-stone", bg: "bg-stone-subtle", color: "#78716C" },

    // Your custom tokens
    {
      border: "border-violet-brand",
      bg: "bg-violet-subtle",
      color: "#8B4CF7",
    },
    { border: "border-amber-dim", bg: "bg-amber-subtle", color: "#C4782A" },
    { border: "border-mint-dim", bg: "bg-mint-subtle", color: "#1BAE84" },
  ];

  const idx = parseInt(id.slice(-6), 16) % themes.length;
  return themes[idx];
};
