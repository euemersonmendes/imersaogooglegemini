DROP POLICY IF EXISTS "inserir próprio progresso" ON public.progresso;
CREATE POLICY "inserir próprio progresso" ON public.progresso FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid()));
DELETE FROM public.progresso g WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = g.user_id);