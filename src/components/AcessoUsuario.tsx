import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { KeyRound, Loader } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { cadastrarAluno } from "@/lib/conta.functions";
import { BOOK } from "@/content/imersao";
import { cn } from "@/lib/utils";

const campo = "mt-1 w-full rounded-xl border border-linha-2 bg-areia px-4 py-3 outline-none focus:border-cobre";

export function AcessoUsuario() {
  const cadastrar = useServerFn(cadastrarAluno);
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      if (modo === "criar") {
        const r = await cadastrar({ data: { nome, email, senha, codigo } });
        if (!r.ok) return setErro(r.erro);
      }
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password: senha });
      if (error) setErro("E-mail ou senha incorretos.");
    } catch {
      setErro("Não foi possível entrar agora. Tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-y-auto bg-areia px-5 py-10 text-tinta">
      <form onSubmit={enviar} className="w-full max-w-md rounded-3xl border border-linha bg-branco p-8 sombra">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-cobre-suave text-cobre-texto">
          <KeyRound className="size-6" />
        </div>
        <p className="sobretitulo mt-6">Imersão Google Gemini · com {BOOK.instrutor}</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight">Acesso do usuário</h1>
        <p className="mt-2 text-apagado">
          {modo === "entrar" ? "Entre com o e-mail e a senha do seu acesso." : "Primeira vez? Crie seu acesso com o código da turma que você recebeu do instrutor."}
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-xl bg-areia p-1 text-sm font-semibold">
          {(["entrar", "criar"] as const).map((m) => (
            <button key={m} type="button" onClick={() => { setModo(m); setErro(""); }} className={cn("rounded-lg py-2", modo === m ? "bg-branco text-tinta sombra" : "text-apagado")}>
              {m === "entrar" ? "Entrar" : "Criar acesso"}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {modo === "criar" && (
            <label className="text-sm font-semibold">
              Nome completo (sai no certificado)
              <input value={nome} onChange={(e) => setNome(e.target.value)} required className={campo} />
            </label>
          )}
          <label className="text-sm font-semibold">
            E-mail
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className={campo} />
          </label>
          <label className="text-sm font-semibold">
            Senha
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required minLength={6} autoComplete={modo === "entrar" ? "current-password" : "new-password"} className={campo} />
          </label>
          {modo === "criar" && (
            <label className="text-sm font-semibold">
              Código da turma
              <input value={codigo} onChange={(e) => setCodigo(e.target.value)} required autoCapitalize="characters" className={cn(campo, "font-semibold uppercase tracking-wider")} />
            </label>
          )}
        </div>

        {erro && <p className="mt-4 rounded-xl bg-cobre-suave px-4 py-3 text-sm text-cobre-texto">{erro}</p>}
        <button type="submit" disabled={enviando} className="btn-tinta mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold disabled:opacity-60">
          {enviando && <Loader className="size-4 animate-spin" />}
          {modo === "entrar" ? "Entrar" : "Criar acesso e entrar"}
        </button>
        <p className="mt-4 text-center text-xs text-apagado">Esqueceu a senha? Fale com o instrutor {BOOK.instrutor}.</p>
      </form>
    </div>
  );
}
