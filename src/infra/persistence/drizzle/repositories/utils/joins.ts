type LeftJoinRow<L, R> = {
  left: L
  right: R | null
}

/**
 * Agrupa linhas de um left join por ID da entidade da esquerda.
 *
 * @param rows - Linhas com resultado de join (left/right)
 * @param extractGroupItem - Função que extrai { id, value } do agrupamento ou null
 * @param buildResult - Função para montar o resultado final a partir do left + grupo
 */
export function groupByLeftJoin<L extends { id: string }, R, G, O>(
  rows: LeftJoinRow<L, R>[],
  extractGroupItem: (row: LeftJoinRow<L, R>) => { id: string; value: G } | null,
  buildResult: (left: L, group: G[]) => O
): O[] {
  const grouped = new Map<string, G[]>()

  for (const row of rows) {
    const item = extractGroupItem(row)

    if (!item) {
      continue
    }

    const current = grouped.get(item.id) ?? []
    current.push(item.value)
    grouped.set(item.id, current)
  }

  const seen = new Set<string>()

  return rows.flatMap((row) => {
    const id = row.left.id

    if (seen.has(id)) {
      return []
    }

    seen.add(id)

    const group = grouped.get(id) ?? []
    return [buildResult(row.left, group)]
  })
}
