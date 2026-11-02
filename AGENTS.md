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
- Reader progress lives in `src/lib/progresso.ts` (useSyncExternalStore, per-user localStorage) and is mirrored to the `progresso` table so the admin panel can see each student's status.
- Access is per-user Cloud auth: students self-register with an active code from the `turmas` table via the `cadastrarAluno` server function (admin client, pre-confirmed), or the admin creates them; the root component gates the whole app on the client session (`src/lib/sessao.ts`).
- Admin = `admin` row in `user_roles` (first account ever created gets it via trigger); admin server functions in `src/lib/conta.functions.ts` re-check `has_role`, and `/api/exercicio` verifies the bearer token itself.
- Certificates are automatic at 20 completed lessons unless a `certificados` row is revoked; the rule lives in `src/lib/certificado.ts` and the insert policy.
