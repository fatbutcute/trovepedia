import { useState, useEffect } from 'react'
import './StaffCard.css'

const WORKER_URL = 'https://tabbyhelper.mail-115.workers.dev'

export default function StaffCard({
  discordId,
  name,
  role,
  fallback = 'https://cdn.discordapp.com/embed/avatars/0.png',
}) {
  const [avatarUrl, setAvatarUrl] = useState(fallback)

  useEffect(() => {
    if (!discordId) return

    const cleanId = discordId.replace(/[^0-9]/g, '')
    if (cleanId.length < 17) return

    fetch(`${WORKER_URL}/${cleanId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.avatar_url) setAvatarUrl(data.avatar_url)
      })
      .catch((err) => console.warn('Discord avatar fetch hiba:', err))
  }, [discordId])

  return (
    <div className="staff-card">
      <div className="staff-avatar-wrapper">
        <div className="staff-glow" />
        <img
          src={avatarUrl}
          alt={name}
          className="staff-avatar-img"
          onError={() => setAvatarUrl(fallback)}
        />
      </div>

      <div className="staff-info">
        <span className="staff-name">{name}</span>
        <span className="staff-role">{role}</span>
      </div>
    </div>
  )
}
