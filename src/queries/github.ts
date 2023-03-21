interface ItemResponseType {
  id: number
  name: string
  full_name: string
  private: boolean
  topics: string[]
  visibility: "public" | "private"
  forks: number
  open_issues: number
  html_url: string
}

interface SearchRepoResponse {
  total_count: number
  incomplete_results: boolean
  items: ItemResponseType[]
}

type searchRepoFn = (
  keyword: string,
  page: number,
  perPage?: number
) => Promise<SearchRepoResponse>

export const searchRepo: searchRepoFn = async (
  keyword = "",
  page = 1,
  perPage = 30
) => {
  const resp = await fetch(
    `https://api.github.com/search/repositories?q=${keyword}&page=${page}&perPage=${perPage}`
  )
  const json = await resp.json()
  if (resp.status !== 200) {
    // throw error if not 200
    throw new Error(json?.message)
  }
  return json
}
