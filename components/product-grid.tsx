"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { products, categories, searchProducts } from "@/lib/products"

export function ProductGrid() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = search ? searchProducts(search) : products
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }
    return result
  }, [search, selectedCategory])

  const categoryCounts = useMemo(() => {
    const base = search ? searchProducts(search) : products
    const counts: Record<string, number> = {}
    for (const cat of categories) {
      counts[cat] = base.filter((p) => p.category === cat).length
    }
    return counts
  }, [search])

  return (
    <section id="sistemas" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">Nossos sistemas</p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl" style={{ fontFamily: 'var(--font-heading)' }}>
            Mais de 100 solucoes para o seu segmento
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Encontre o sistema perfeito para o seu tipo de negocio. Cada solucao inclui gestao completa, captacao de clientes e programa de indicacao.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar sistema por nome ou segmento..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              !selectedCategory
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
            }`}
          >
            Todos ({(search ? searchProducts(search) : products).length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {cat} ({categoryCounts[cat]})
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <Link
              key={product.id}
              href={`/sistema/${product.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <span className="text-sm font-bold text-accent">{product.name[0]}</span>
                </div>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {product.category}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-foreground">{product.name}</h3>
              <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                {product.shortDescription}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                Ver detalhes <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">Nenhum sistema encontrado. Tente outro termo de busca.</p>
          </div>
        )}
      </div>
    </section>
  )
}
