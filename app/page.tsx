import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Features } from "@/components/features"
import { ProductGrid } from "@/components/product-grid"
import { Pricing } from "@/components/pricing"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <ProductGrid />
        <Features />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
