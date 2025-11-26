/*
  Puppeteer ile WhatsApp Web otomatik mesaj gönderme örneği

  ÖNEMLİ UYARI:
    - Bu tür otomasyon WhatsApp kurallarına ve yerel yasalara tabidir.
    - İzin almadan toplu mesaj göndermek spam sayılabilir. Sorumluluk kullanıcıya aittir.

  Gereksinimler:
    - Node.js (16+ önerilir)
    - Bu klasörde terminalde: `npm install puppeteer`

  Kullanım:
    1) İlk çalıştırmada QR kodu tarayın (oturum kaydı için `userDataDir` kullanılmıştır).
    2) `contacts` dizisini düzenleyin.
    3) `node puppeteer-send.js` ile çalıştırın.

  Notlar:
    - Selector'lar WhatsApp Web güncellemeleriyle değişebilir. Eğer gönderme çalışmazsa
      element selector'larını tarayıcıda inspect ederek güncelleyin.
    - Hız kontrolü ve rastgele gecikmeler eklendi, yine de çok sık gönderim yapmayın.

*/

const puppeteer = require('puppeteer');

// Test için örnek liste: uluslararası format (ülke kodu + numara, + işareti olmadan)
const contacts = [
  { phone: '905551234567', message: 'Merhaba! Bu otomatik bir test mesajıdır.' },
  // { phone: '905551234568', message: 'İkinci test mesajı — lütfen cevap vermeyin.' }
];

const USER_DATA_DIR = './.whatsapp-session';

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    userDataDir: USER_DATA_DIR
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  for (const c of contacts) {
    const url = `https://web.whatsapp.com/send?phone=${c.phone}&text=${encodeURIComponent(c.message)}`;
    console.log('Navigating to', url);
    await page.goto(url, { waitUntil: 'networkidle2' });

    try {
      // İlk açılışta QR kodu taramanız gerekebilir; bekleme süresi uzun tutuldu.
      await page.waitForSelector('div[contenteditable="true"]', { timeout: 60000 });
      // Kısa bekleme, WhatsApp bazen otomatik yüklemeyi tamamlar
      await page.waitForTimeout(1000 + randBetween(500, 1500));

      // Enter tuşu ile mesajı gönder
      await page.keyboard.press('Enter');

      // Gönderim sonrası kısa, rastgele bekleme
      await page.waitForTimeout(randBetween(3000, 6000));
      console.log('Gönderildi:', c.phone);

    } catch (err) {
      console.error('Gönderilemedi (zaman aşımı veya selector değişti):', c.phone, err.message);
    }

    // İsteğe bağlı: sonraki numaraya geçmeden önce daha uzun bekleyin
    await page.waitForTimeout(randBetween(2000, 4000));
  }

  console.log('Bitti. Tarayıcı oturumu korunuyor:', USER_DATA_DIR);
  console.log('Tarayıcıyı kapatmak isterseniz manuel kapatın veya kodda browser.close() ekleyin.');
  // await browser.close(); // isteğe bağlı
})();
