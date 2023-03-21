import Pagination from "@/components/Pagination"

export default function Home() {
  return (
    <>
      <div>hello here</div>
      <Pagination noOfPages={5} currentPage={2} onPageChange={() => null} />
    </>
  )
}
