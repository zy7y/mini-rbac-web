interface IQueryAll {
  offset: number
  limit: number
  ordering?: string
}

interface IQueryUserParams extends IQueryAll {
  username?: string
  nickname?: string
  status?: number
}
