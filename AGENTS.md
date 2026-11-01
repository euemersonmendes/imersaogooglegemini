<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Book content lives as typed data in `src/content/modules/*.ts` (blocks defined in `src/content/types.ts`) and is rendered by `src/components/book/Blocks.tsx`; add pages by editing data, not JSX, so navigation/TOC/progress stay automatic.
- Reader URLs are `/ler/<section>/<page>` (e.g. `/ler/5.1/1`), mirroring the reference book's chapter.section/page addressing.
- Reader progress (visited pages, checklists, quiz answers) is stored in localStorage via `src/lib/progress.ts` with `useSyncExternalStore`, so SSR renders an empty state and hydrates safely.
