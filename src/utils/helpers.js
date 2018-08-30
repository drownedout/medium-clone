export function formatDate (timestamp) {
  const date = new Date(timestamp)
  const time = date.toLocaleTimeString('en-US')
  return time.substr(0, 4) + time.slice(-3) + ' | ' + date.toLocaleDateString()
}