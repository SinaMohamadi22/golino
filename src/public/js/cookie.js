export const getCookie = (name) => {
  const cookies = document.cookie.split("; ")

  const cookie = cookies.find(row => row.startsWith(name + "="))

  if(cookie){
    return decodeURIComponent(cookie.split("=")[1])
  }

  return null
}

export const setCookie = (name,value,days) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)

  document.cookie =
  `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Lax`
}

export const logout = () => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}