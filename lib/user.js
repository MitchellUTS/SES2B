import { useState, useEffect } from 'react'

export async function fetchUser(cookie = '') {
  if (typeof window !== 'undefined' && window.__user) {
    return window.__user
  }

  try {
    const res = await fetch(
      '/api/auth/profile',
      cookie
        ? {
            headers: {
              cookie,
            },
          }
        : {}
    )
  
    if (!res.ok) {
      if (typeof window !== 'undefined')
        delete window.__user
      return null
    }
  
    const json = await res.json()
    if (typeof window !== 'undefined') {
      window.__user = json
    }
    return json
  } catch (err) {
    // console.error(err);
  }
  
}

export function useFetchUser({ required } = {}) {
  const [loading, setLoading] = useState(
    () => !(typeof window !== 'undefined' && window.__user)
  )
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return window.__user || null
  })

  useEffect(
    () => {
      if (!loading && user) {
        return
      }
      setLoading(true)
      let isMounted = true

      fetchUser().then((user) => {
        // Only set the user if the component is still mounted
        if (isMounted) {
          // When the user is not logged in but login is required
          if (required && !user) {
            window.location.href = '/api/auth/login'
            return
          }
          setUser(user)
          setLoading(false)
        }
      })

      return () => {
        isMounted = false
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { user, loading }
}
