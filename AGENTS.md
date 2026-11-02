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
- Certificate sharing generates the same local PDF as downloads and uses user-initiated native file sharing; unsupported browsers download it and open WhatsApp with an explicit manual-attachment notice, without uploading student certificates publicly.
- Book content is typed data: Módulo → Aula → Passos in `src/content/imersao/*.ts` (types in `tipos.ts`), rendered per step type by `src/components/imersao/Passos.tsx`; add lessons by editing data so sidebar, tabs and progress stay automatic.
- Every aula ends with a `resultado` step carrying an `exercicio` (situacao, tarefa ≥2 with a `[[...]]` gap for the student's own data, entrega) — a hands-on exercise applied to the student's own business management; `imersao.test.ts` enforces this for every new lesson.
- Reader URLs are `/ler/<aula>/<passo>` (e.g. `/ler/1.1/2`), mirroring the reference book's section/page addressing; passo 1 is always the auto-generated Objetivo.
- Reader progress lives in `src/lib/progresso.ts` (useSyncExternalStore, per-user localStorage) and is mirrored to the `progresso` table so the admin panel can see each student's status.
- A aula só é concluída quando o aluno marca todos os itens do "Confira antes de concluir" e clica em "Concluir aula" (`podeConcluir` em `progresso.ts`); nunca concluir automaticamente por passos vistos — `progresso.test.ts` guarda essa regra.
- Access is per-user Cloud auth: students self-register with an active code from `turmas` or the admin creates them; the root gates course/admin pages, excluding the presentation, access and certificate verification pages so public validation works without login.
- Certificate verification uses an exact UUID lookup and a minimal public DTO via `validacao-certificado.functions.ts`; anonymous table/list access remains blocked to protect student details. Legacy `/admin/aluno/$id` QR links render only verification for non-admins; new QR links use `/validar/$codigo`.
- Admin = `admin` row in `user_roles` (first account ever created gets it via trigger); admin server functions in `src/lib/conta.functions.ts` re-check `has_role`, and `/api/exercicio` verifies the bearer token itself.
- Certificates are automatic at 20 completed lessons unless a `certificados` row is revoked; the rule lives in `src/lib/certificado.ts` and the insert policy.
