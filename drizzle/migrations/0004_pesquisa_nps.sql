CREATE TABLE public.nps_respostas (
  user_id uuid PRIMARY KEY,
  nota smallint NOT NULL CHECK (nota BETWEEN 0 AND 10),
  conteudo smallint CHECK (conteudo BETWEEN 1 AND 5),
  instrutor smallint CHECK (instrutor BETWEEN 1 AND 5),
  plataforma smallint CHECK (plataforma BETWEEN 1 AND 5),
  aplicacao smallint CHECK (aplicacao BETWEEN 1 AND 5),
  motivo text CHECK (char_length(motivo) <= 2000),
  melhorar text CHECK (char_length(melhorar) <= 2000),
  depoimento text CHECK (char_length(depoimento) <= 2000),
  autoriza_depoimento boolean NOT NULL DEFAULT false,
  criado_em timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.nps_respostas TO authenticated;
GRANT ALL ON public.nps_respostas TO service_role;
ALTER TABLE public.nps_respostas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "aluno lê a própria resposta" ON public.nps_respostas FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "aluno responde ao concluir" ON public.nps_respostas FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.progresso p WHERE p.user_id = auth.uid() AND p.concluidas >= 20));
CREATE POLICY "aluno atualiza a própria resposta" ON public.nps_respostas FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());