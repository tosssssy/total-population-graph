export const getApi = async <T>(url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY || '',
    },
  })

  return (await response.json()) as T
}
