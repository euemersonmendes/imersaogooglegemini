CREATE OR REPLACE FUNCTION public.zerar_certificado_se_reiniciou()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.concluidas = 0 AND COALESCE(OLD.concluidas, 0) > 0 THEN
    DELETE FROM public.certificados WHERE user_id = NEW.user_id AND revogado = false;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS ao_reiniciar_zera_certificado ON public.progresso;
CREATE TRIGGER ao_reiniciar_zera_certificado AFTER UPDATE OF concluidas ON public.progresso
FOR EACH ROW EXECUTE FUNCTION public.zerar_certificado_se_reiniciou();
DELETE FROM public.certificados c USING public.progresso g
WHERE g.user_id = c.user_id AND c.revogado = false AND g.concluidas = 0;