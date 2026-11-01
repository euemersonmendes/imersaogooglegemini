import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { KeyRound, Loader } from "lucide-react";

import { entrarTurma } from "@/lib/acesso.functions";

export function CodigoTurma() {
  const router = useRouter();
  const entrar = useServerFn(entrarTurma);
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return setErro("Digite o código da sua turma.");
    setEnviando(true);
    setErro("");
    try {
      const r = await entrar({ data: { codigo } });
      if (r.ok) await router.invalidate();
      else setErro("Código inválido. Confira com o instrutor da sua turma.");
    } catch {
      setErro("Não foi possível verificar agora. Tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-areia px-5 text-tinta">
      <form onSubmit={enviar} className="w-full max-w-md rounded-3xl border border-linha bg-branco p-8 sombra">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-cobre-suave text-cobre-texto">
          <KeyRound className="size-6" />
        </div>
        <p className="sobretitulo mt-6">Imersão Google Gemini</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight">Acesso da turma</h1>
        <p className="mt-2 text-apagado">Digite o código que você recebeu do instrutor para abrir o ebook.</p>
        <input
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código da turma"
          autoFocus
          autoCapitalize="characters"
          aria-label="Código da turma"
          className="mt-6 w-full rounded-xl border border-linha-2 bg-areia px-4 py-3 font-semibold uppercase tracking-wider outline-none focus:border-cobre"
        />
        {erro && <p className="mt-3 rounded-xl bg-cobre-suave px-4 py-3 text-sm text-cobre-texto">{erro}</p>}
        <button
          type="submit"
          disabled={enviando}
          className="btn-tinta mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold disabled:opacity-60"
        >
          {enviando && <Loader className="size-4 animate-spin" />}
          Entrar
        </button>
      </form>
    </div>
  );
}
