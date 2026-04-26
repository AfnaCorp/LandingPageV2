import type { Metadata } from 'next';
import { LegalDocumentPage } from '@/components/legal-document-page';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | JLOOW',
};

export default function CgvPage() {
  return <LegalDocumentPage title="Conditions Générales de Vente" fileName="cgv.md" />;
}
