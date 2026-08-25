import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import AuthorityEnhancements from './AuthorityEnhancements.jsx'

export default function AuthorityPortal({ path }) {
  const [target, setTarget] = useState(null)
  useEffect(() => {
    setTarget(document.querySelector('.detail-page main'))
  }, [path])
  if (!target) return null
  return createPortal(<AuthorityEnhancements path={path}/>, target)
}
