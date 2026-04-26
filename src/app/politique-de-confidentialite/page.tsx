import type { Metadata } from 'next';
import { LegalDocumentPage } from '@/components/legal-document-page';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | JLOOW',
};

export default function PolitiqueConfidentialitePage() {
  return <LegalDocumentPage title="Politique de Confidentialité" fileName="politique-confidentialite.md" />;
}
