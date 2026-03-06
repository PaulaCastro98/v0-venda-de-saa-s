'use client';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Painel de Afiliados - SimpleWork',
  description: 'Gerencie seus leads e comissões como afiliado SimpleWork',
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
