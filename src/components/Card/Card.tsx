import React from "react"

type CardProps = {
  fullName: string
  topics: string[]
  visibility: "public" | "private"
  forks: number
  openIssues: number
  htmlUrl: string
}

function Card({
  fullName,
  topics,
  visibility,
  forks,
  openIssues,
  htmlUrl,
}: CardProps) {
  const visibilityText = visibility === "private" ? "Private" : "Public"

  return (
    <a target="_blank" href={htmlUrl}>
      <div className="mt-6 rounded-lg shadow-lg bg-green-100">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{fullName}</div>
          {topics.length > 0 ? (
            <div className="text-gray-700 text-base">
              Topics: {topics.join(", ")}
            </div>
          ) : null}{" "}
          <div className="text-gray-700 text-base">
            Visibility: {visibilityText}
          </div>
          <div className="text-gray-700 text-base">Forks: {forks}</div>
          <div className="text-gray-700 text-base">
            Open Issues: {openIssues}
          </div>
        </div>
      </div>
    </a>
  )
}

export default Card
