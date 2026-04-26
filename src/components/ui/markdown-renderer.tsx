'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type MarkdownRendererProps = {
  markdown: string;
  className?: string;
};

type ParagraphLine = {
  text: string;
  hardBreak: boolean;
};

type TableAlignment = 'left' | 'center' | 'right' | null;

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const sanitizeHref = (href: string): string => {
  const trimmed = href.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  return '#';
};

const renderInline = (text: string): string => {
  let content = escapeHtml(text);

  content = content.replace(
    /\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label: string, href: string) =>
      `<a href="${escapeHtml(sanitizeHref(href))}" target="_blank" rel="noopener noreferrer">${label}</a>`
  );

  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
  content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  content = content.replace(/_([^_]+)_/g, '<em>$1</em>');

  return content;
};

const normalizeParagraphLine = (rawLine: string): ParagraphLine => {
  const hardBreak = /(?: {2,}|\\)\s*$/.test(rawLine);
  const text = hardBreak ? rawLine.replace(/(?: {2,}|\\)\s*$/, '') : rawLine;

  return {
    text: text.trim(),
    hardBreak,
  };
};

const splitTableRow = (line: string): string[] =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

const normalizeTableCells = (cells: string[], width: number): string[] => {
  if (cells.length === width) {
    return cells;
  }

  if (cells.length > width) {
    return cells.slice(0, width);
  }

  return [...cells, ...Array.from({ length: width - cells.length }, () => '')];
};

const parseTableAlignments = (line: string): TableAlignment[] | null => {
  const cells = splitTableRow(line);

  if (!cells.length) {
    return null;
  }

  const isAlignmentRow = cells.every((cell) => /^:?-{3,}:?$/.test(cell.replace(/\s+/g, '')));
  if (!isAlignmentRow) {
    return null;
  }

  return cells.map((cell) => {
    const normalized = cell.replace(/\s+/g, '');
    const hasLeftColon = normalized.startsWith(':');
    const hasRightColon = normalized.endsWith(':');

    if (hasLeftColon && hasRightColon) {
      return 'center';
    }

    if (hasRightColon) {
      return 'right';
    }

    if (hasLeftColon) {
      return 'left';
    }

    return null;
  });
};

const tableAlignmentStyle = (alignment: TableAlignment): string =>
  alignment ? ` style="text-align:${alignment}"` : '';

const markdownToHtml = (markdown: string): string => {
  const lines = markdown.replaceAll('\r\n', '\n').split('\n');

  const html: string[] = [];
  let paragraphBuffer: ParagraphLine[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }
    const content = paragraphBuffer
      .map((line, index) => {
        const separator =
          index < paragraphBuffer.length - 1 ? (line.hardBreak ? '<br />' : ' ') : '';
        return `${renderInline(line.text)}${separator}`;
      })
      .join('');

    html.push(`<p>${content}</p>`);
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listType || !listItems.length) {
      listType = null;
      listItems = [];
      return;
    }
    const items = listItems.map((item) => `<li>${renderInline(item)}</li>`).join('');
    html.push(`<${listType}>${items}</${listType}>`);
    listType = null;
    listItems = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushParagraph();
      flushList();
      html.push('<hr />');
      continue;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ul') {
        flushList();
      }
      listType = 'ul';
      listItems.push(unorderedMatch[1]);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== 'ol') {
        flushList();
      }
      listType = 'ol';
      listItems.push(orderedMatch[1]);
      continue;
    }

    const headerCells = splitTableRow(line);
    const alignments = parseTableAlignments(lines[index + 1] ?? '');
    if (line.includes('|') && alignments && headerCells.length === alignments.length) {
      flushParagraph();
      flushList();

      const bodyRows: string[][] = [];
      let tableIndex = index + 2;

      while (tableIndex < lines.length) {
        const bodyLine = lines[tableIndex].trim();
        if (!bodyLine || !bodyLine.includes('|')) {
          break;
        }

        bodyRows.push(normalizeTableCells(splitTableRow(bodyLine), headerCells.length));
        tableIndex += 1;
      }

      const headerHtml = headerCells
        .map(
          (cell, cellIndex) =>
            `<th${tableAlignmentStyle(alignments[cellIndex] ?? null)}>${renderInline(cell)}</th>`
        )
        .join('');

      const bodyHtml = bodyRows.length
        ? `<tbody>${bodyRows
            .map(
              (cells) =>
                `<tr>${cells
                  .map(
                    (cell, cellIndex) =>
                      `<td${tableAlignmentStyle(alignments[cellIndex] ?? null)}>${renderInline(cell)}</td>`
                  )
                  .join('')}</tr>`
            )
            .join('')}</tbody>`
        : '';

      html.push(`<table><thead><tr>${headerHtml}</tr></thead>${bodyHtml}</table>`);
      index = tableIndex - 1;
      continue;
    }

    paragraphBuffer.push(normalizeParagraphLine(rawLine));
  }

  flushParagraph();
  flushList();

  return html.join('');
};

export function MarkdownRenderer({ markdown, className }: MarkdownRendererProps) {
  const html = markdownToHtml(markdown);

  return (
    <div
      className={cn(
        'text-sm leading-relaxed text-foreground',
        '[&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-semibold',
        '[&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold',
        '[&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold',
        '[&_p]:mb-3',
        '[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5',
        '[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5',
        '[&_li]:mb-1',
        '[&_a]:font-medium [&_a]:text-primary [&_a]:underline',
        '[&_strong]:font-semibold',
        '[&_em]:italic',
        '[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
        '[&_table]:mb-4 [&_table]:min-w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl',
        '[&_thead]:bg-muted/50',
        '[&_tr]:border-b [&_tr]:border-border/60',
        '[&_th]:border [&_th]:border-border/60 [&_th]:px-3 [&_th]:py-2 [&_th]:font-semibold',
        '[&_td]:border [&_td]:border-border/60 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top',
        '[&_hr]:my-4 [&_hr]:border-border/60',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
