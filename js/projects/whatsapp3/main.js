
/*
	WhatsApp Web ile toplu mesaj gönderme - Basit client-side örnek

	Yöntem 1 (kolay, manuel onay gerektirir):
		- `wa.me` linkleri oluşturup sırayla açarsınız.
		- Her link kullanıcıyı ilgili sohbete götürür; gönderme işlemini
			WhatsApp Web arayüzünden manuel onaylamanız gerekir.

	Notlar:
		- Tarayıcı popup engelleyicisini kapatmanız veya izin vermeniz gerekebilir.
		- Toplu ve otomatik spam yasağına dikkat edin; yasal ve etik kullanın.

	Örnek kullanım:
		const list = [
			{ phone: '905551234567', message: 'Merhaba, bu bir test mesajıdır.' },
			{ phone: '905551234568', message: 'İyi günler! Bu başka bir test.' }
		];
		sendBulkViaWaMe(list, { delayMs: 5000, reuseTab: true });

*/s

function normalizePhone(phone) {
	// Basit normalizasyon: + ve boşlukları kaldır
	return String(phone).replace(/[^0-9]/g, '');
}

function buildWaMeUrl(phone, text) {
	const p = normalizePhone(phone);
	const encoded = encodeURIComponent(text || '');
	return `https://wa.me/${p}?text=${encoded}`;
}

function sleep(ms) {
	return new Promise((res) => setTimeout(res, ms));
}

async function sendBulkViaWaMe(list, { delayMs = 4000, reuseTab = true } = {}) {
	// list: [{phone, message}, ...]
	const target = reuseTab ? 'whatsapp-send-tab' : '_blank';
	for (const item of list) {
		const url = buildWaMeUrl(item.phone, item.message);
		// Açılır pencerelerin engellenmemesi için kullanıcıdan izin gerekebilir
		window.open(url, target);
		// Kullanıcı her açılan pencerede "Gönder" butonuna basmalı.
		await sleep(delayMs);
	}
}

// Export (node/ESM değilse window üzerinden kullanılabilir)
if (typeof window !== 'undefined') {
	window.buildWaMeUrl = buildWaMeUrl;
	window.sendBulkViaWaMe = sendBulkViaWaMe;
}

// Örnek veri (test amaçlı). Gerçek kullanımda veriyi sunucudan veya input'tan alabilirsiniz.
const exampleList = [
	{ phone: '905334762145', message: 'Merhaba! Bu bir test mesajıdır.' }
];

// Uncomment to run automatically in browser console (daha güvenli: çalıştırmadan önce inceleyin)
// sendBulkViaWaMe(exampleList, { delayMs: 5000, reuseTab: true });
