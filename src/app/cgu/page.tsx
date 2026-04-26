import type { Metadata } from 'next';
import { LegalDocumentPage } from '@/components/legal-document-page';

export const metadata: Metadata = {
  title: 'Conditions Générales d’Utilisation | JLOOW',
};

export default function CguPage() {
  return <LegalDocumentPage title="Conditions Générales d’Utilisation" fileName="cgu.md" />;
}
