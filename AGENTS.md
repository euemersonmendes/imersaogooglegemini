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
- Book content is typed data: Módulo → Aula → Passos in `src/content/imersao/*.ts` (types in `tipos.ts`), rendered per step type by `src/components/imersao/Passos.tsx`; add lessons by editing data so sidebar, tabs and progress stay automatic.
- Reader URLs are `/ler/<aula>/<passo>` (e.g. `/ler/1.1/2`), mirroring the reference book's section/page addressing; passo 1 is always the auto-generated Objetivo.
- Reader progress lives in localStorage via `src/lib/progresso.ts` with `useSyncExternalStore`, so SSR renders empty state and hydrates safely.
- Class-code access: valid codes live only in `src/lib/acesso.server.ts`; the root `beforeLoad` checks an HttpOnly cookie via server function, and server routes (e.g. `/api/exercicio`) must re-check it themselves.
