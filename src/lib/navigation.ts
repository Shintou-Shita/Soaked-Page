import type { CollectionEntry } from 'astro:content';
import { groupNotes } from './notes';

export interface SidebarItem {
  label: string;
  href?: string;
  children?: SidebarItem[];
}

type Entry = CollectionEntry<'teaching'> | CollectionEntry<'notes'>;

const link = (label: string, href: string): SidebarItem => ({ label, href });

export function buildSidebar(
  pathname: string,
  teachingEntries: CollectionEntry<'teaching'>[],
  noteEntries: CollectionEntry<'notes'>[],
): SidebarItem[] {
  if (pathname.startsWith('/teaching')) {
    const lectures = teachingEntries
      .filter((entry) => entry.slug.startsWith('ps1/handouts/'))
      .sort((a, b) => (a.data.week ?? 999) - (b.data.week ?? 999) || a.slug.localeCompare(b.slug))
      .map((entry) => link(entry.data.title, `/teaching/${entry.slug}/`));

    return [
      {
        label: '问题求解',
        href: '/teaching/',
        children: [
          {
            label: '问题求解一',
            href: '/teaching/ps1',
            children: [
              link('课程概览', '/teaching/ps1/outline'),
              ...(lectures.length ? [{ label: '讲义', children: lectures }] : []),
            ],
          },
        ],
      },
    ];
  }

  if (pathname.startsWith('/notes')) {
    return [
      {
        label: '笔记',
        href: '/notes/',
        children: groupNotes(noteEntries).map((group) => ({
          label: group.label,
          children: group.entries.map((entry) => link(entry.data.title, `/notes/${entry.slug}/`)),
        })),
      },
    ];
  }

  return [];
}

export function isPublishedEntry(entry: Entry, now = new Date()) {
  return entry.data.published && (!entry.data.releaseDate || entry.data.releaseDate <= now);
}
