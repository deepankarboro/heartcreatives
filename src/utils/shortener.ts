export async function shortenUrl(longUrl: string): Promise<string> {
  // If the URL is already short (e.g. sample card reference), return directly
  if (longUrl.length < 60) {
    return longUrl;
  }

  try {
    // Try TinyURL API
    const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`, {
      method: 'GET',
    });
    if (res.ok) {
      const short = (await res.text()).trim();
      if (short.startsWith('http')) {
        return short;
      }
    }
  } catch (err) {
    console.warn('TinyURL shortener failed, trying is.gd fallback:', err);
  }

  try {
    // Fallback: is.gd API
    const res = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.shorturl) {
        return data.shorturl;
      }
    }
  } catch (err) {
    console.warn('is.gd shortener fallback failed:', err);
  }

  // Graceful fallback: return original long URL
  return longUrl;
}
