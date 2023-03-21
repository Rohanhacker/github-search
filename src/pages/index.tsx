import Pagination from "@/components/Pagination"
import ThrottledSearch from "@/components/ThrottledSearch"

export default function Home() {
  return (
    <>
      <div>hello here</div>
      <div>
        <ThrottledSearch onSearch={console.log} />
      </div>
      <Pagination noOfPages={5} currentPage={2} onPageChange={() => null} />
    </>
  )
}
