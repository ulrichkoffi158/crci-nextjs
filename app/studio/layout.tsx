import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRCI Studio – Gestion de contenu',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ height: '100vh' }}>{children}</div>
}
