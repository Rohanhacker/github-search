import { useThrottle } from "@/hooks/useThrottle"
import React, { ChangeEvent, useEffect, useState } from "react"

type Props = {
  onSearch: (value: string) => void
  throttle?: number
}

function ThrottledSearch({ onSearch, throttle = 250 }: Props) {
  const [value, setValue] = useState<string>("")
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const throttledValue = useThrottle(value, throttle)

  useEffect(() => {
    onSearch(throttledValue)
  }, [throttledValue, onSearch])

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="py-2 pl-4 pr-10 block w-full rounded-md border border-gray-300 outline-blue-500"
        placeholder="Search..."
      />
    </div>
  )
}

export default ThrottledSearch
