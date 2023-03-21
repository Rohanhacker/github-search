import Card from "@/components/Card"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"
import ThrottledSearch from "@/components/ThrottledSearch"
import { searchRepo } from "@/queries/github"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useState } from "react"

export default function Home() {
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState("")
  // using react-query to cache stuff
  const query = useQuery({
    queryKey: [keyword, page, "search-github"],
    queryFn: () => searchRepo(keyword, page),
    enabled: !!keyword,
    retry: false
  })

  function _onSearch(keyword: string) {
    setKeyword(keyword)
    setPage(1)
  }

  function _onPageChange(page: number) {
    setPage(page)
  }

  // new onsearch is created on every render which we don't want
  // cause this onsearch is used by throttledsearch component and is in useeffect there
  const onSearch = useCallback(_onSearch, [])

  const onPageChange = useCallback(_onPageChange, [])

  const showPagination = query.data?.total_count && query.data?.total_count > 30
  // github only allows upto 100 items in total
  const totalCount = showPagination ? Math.min(query.data?.total_count!, 100) : 0
  const noOfPages = showPagination
    ? Math.ceil(totalCount / 30)
    : 0

  const searchResults = (query.isLoading) ? (
    <Spinner />
  ) : (
    <>
      <div className="my-4">
        {query.data?.items.map((item) => {
          return (
            <Card
              key={item.id}
              fullName={item.full_name}
              forks={item.forks}
              topics={item.topics}
              visibility={item.visibility}
              openIssues={item.open_issues}
              htmlUrl={item.html_url}
            />
          )
        })}
      </div>
      {showPagination ? (
        <Pagination
          noOfPages={noOfPages}
          currentPage={page}
          onPageChange={onPageChange}
        />
      ) : null}
    </>
  )

  // react query error type is unkown because you can throw anything
  // but we know we are throwing error type so typecasting here
  const error = query.error as Error

  const resultsSection = query.isError ? (
    <div>
      {error.message}
    </div>
  ) : searchResults

  return (
    <>
      <div className="flex justify-center">
        <div className="w-3/5 mt-4">
          <ThrottledSearch onSearch={onSearch} />
          <div className="my-6">
            {keyword === "" ? "Type in to search" : resultsSection}
          </div>
        </div>
      </div>
    </>
  )
}
