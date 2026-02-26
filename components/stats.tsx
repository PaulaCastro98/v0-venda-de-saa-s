const stats = [
  { value: "100+", label: "Sistemas prontos" },
  { value: "1.000+", label: "Clientes ativos" },
  { value: "24h", label: "Suporte disponivel" },
  { value: "98%", label: "Satisfacao" },
]

export function Stats() {
  return (
    <section className="border-b border-border bg-card px-6 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
