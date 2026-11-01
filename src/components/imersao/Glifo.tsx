import { Bot, ChartNoAxesColumn, Loader, MessageSquare, Table2, type LucideProps } from "lucide-react";

import type { GlifoId } from "@/content/imersao/tipos";

const mapa = {
  chat: MessageSquare,
  spark: Loader,
  chart: ChartNoAxesColumn,
  grid: Table2,
  bot: Bot,
} as const;

export function Glifo({ id, ...props }: { id: GlifoId } & LucideProps) {
  const Icone = mapa[id];
  return <Icone strokeWidth={1.75} {...props} />;
}

/** O "spark" do cartão de prompt (raios em cobre). */
export function Faisca(props: LucideProps) {
  return <Loader strokeWidth={2} {...props} />;
}
