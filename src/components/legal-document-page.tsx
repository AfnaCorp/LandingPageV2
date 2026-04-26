import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';
import { BackToTopButton } from '@/components/back-to-top-button';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

type LegalDocumentPageProps = {
  title: string;
  fileName: string;
};

export async function LegalDocumentPage({ title, fileName }: LegalDocumentPageProps) {
  const markdown = await readFile(path.join(process.cwd(), 'legal', fileName), 'utf-8');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Navigation légale">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <Image
              src="/Logo_final_NB_png.png?v=3"
              alt=""
              width={41}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <span className="text-lg font-bold text-foreground">JLOOW</span>
          </Link>

          <Link href="/" className="text-sm font-semibold text-muted-foreground underline underline-offset-4 hover:text-foreground">
            Retour à l'accueil
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground sm:text-4xl">{title}</h1>
        </div>

        <article className="rounded-lg border border-border/60 bg-card/85 p-5 shadow-[0_18px_60px_-42px_hsl(var(--foreground)/0.35)] sm:p-8">
          <MarkdownRenderer
            markdown={markdown}
            className="max-w-none [&_h1]:hidden [&_h2]:mt-7 [&_h2:first-of-type]:mt-0 [&_h2]:text-xl [&_h3]:mt-5 [&_h3]:text-base [&_p]:text-muted-foreground [&_li]:text-muted-foreground"
          />
        </article>
      </section>
      <BackToTopButton />
    </main>
  );
}
