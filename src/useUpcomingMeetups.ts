import { onMounted, onUnmounted, ref } from 'vue'
import { getUpcomingMeetups } from './content'

export function useUpcomingMeetups() {
  const upcomingMeetups = ref(getUpcomingMeetups())
  const refresh = () => { upcomingMeetups.value = getUpcomingMeetups() }
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    timer = setInterval(refresh, 60_000)
    window.addEventListener('focus', refresh)
  })
  onUnmounted(() => {
    clearInterval(timer)
    window.removeEventListener('focus', refresh)
  })
  return upcomingMeetups
}
