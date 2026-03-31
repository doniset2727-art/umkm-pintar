exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
```

**4. Klik "Commit changes"**

---

**5. Sekarang buka file `index.html`** → klik ✏️ edit

**6. Tekan `Ctrl + F`** cari teks:
> `https://api.anthropic.com/v1/messages`

**7. Ganti URL tersebut** dari:
> `https://api.anthropic.com/v1/messages`

menjadi:
> `/.netlify/functions/chat`

**8. Hapus bagian `x-api-key` dan `anthropic-version`** dari headers di `index.html` karena sekarang sudah dipindah ke `chat.js`. Bagian headers cukup jadi:
```
headers: { 'Content-Type': 'application/json' },
