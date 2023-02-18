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

interface IQueryRoleParams extends IQueryAll {
  name?: string
  status?: number
}
