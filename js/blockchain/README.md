# 🔗 JavaScript Blockchain Workshop

Modern JavaScript ile geliştirilmiş, eğitim amaçlı blockchain implementasyonu. Bu proje, blockchain teknolojisinin temel kavramlarını öğrenmek ve gerçek kriptografik hash'lerle deneyim kazanmak için tasarlanmıştır.

## 🌟 Özellikler

- ✅ **Gerçek SHA-256 Hash** (Crypto-JS & Node.js crypto)
- ✅ **Proof of Work Mining** (Nonce tabanlı)
- ✅ **UTXO Set Management** (Optimize edilmiş bakiye sistemi)
- ✅ **Transaction Validation** (Bakiye kontrolü)
- ✅ **Dynamic Difficulty** (Otomatik zorluk ayarı)
- ✅ **Mining Statistics** (Hash rate, süre, deneme sayısı)
- ✅ **Chain Validation** (Bütünlük kontrolü)
- ✅ **Cross-Platform** (Browser & Node.js)

## 🚀 Hızlı Başlangıç

### Prerequisites

- Node.js >= 14.0.0
- Modern web browser (Chrome, Firefox, Safari)

### Kurulum

```bash
# Repository'yi klonla
git clone <repository-url>
cd blockchain

# Dependencies'leri yükle
npm install

# HTTP server başlat (Browser version için)
npm run serve
```

## 🎯 Kullanım Senaryoları

### 1. Browser Demo (Vite Bundler)

```bash
cd browser
npm run dev
# http://localhost:5173 adresine git
```

**Özellikler:**
- 🖥️ Interactive web interface
- ⚡ Hot Module Replacement (HMR)
- 📊 Real-time mining visualization
- 💰 Balance checking
- 🔍 Blockchain explorer
- ⚙️ Difficulty adjustment
- 🌳 Tree shaking optimization

### 2. Node.js CLI (Komut Satırı)

```bash
# Temel blockchain testi
npm start

# Crypto-JS versiyonu
npm run crypto

# Node.js native crypto versiyonu
npm run node-crypto
```

## 📁 Proje Yapısı

```
blockchain/
├── 📁 browser/                    # Vite Browser versiyonu
│   ├── 📄 index.html              # Vite entry point
│   ├── 📄 main.js                 # Ana JavaScript
│   ├── 📄 block-browser-vite.js   # Vite optimized Block
│   ├── 📄 blockchain-browser-vite.js # Vite optimized Blockchain
│   ├── 📄 style.css               # Stylesheet
│   ├── 📄 vite.config.js          # Vite config
│   └── 📄 package.json            # Browser dependencies
├── 📁 node/                       # Node.js versiyonları
│   ├── 📄 block-node-crypto.js
│   ├── 📄 blockchain-node-crypto.js
│   └── 📄 test-node-crypto.js
├── 📄 package.json                # Ana package.json
├── 📄 README.md
└── 📄 README-comparison.md
```

## 🔧 API Kullanımı

### Temel Blockchain İşlemleri

```javascript
import { Blockchain } from './blockchain-browser-crypto.js';

// 1. Blockchain oluştur
const myBlockchain = new Blockchain();

// 2. Başlangıç bakiyelerini oluştur
myBlockchain.initializeBalances();

// 3. İşlem oluştur
myBlockchain.createTransaction({
    fromAddress: 'ahmet-wallet',
    toAddress: 'mehmet-wallet',
    amount: 100
});

// 4. Mining yap
const result = myBlockchain.minePendingTransactions('miner-wallet');
console.log(`Mining tamamlandı: ${result.time}ms`);

// 5. Bakiye kontrol et
const balance = myBlockchain.getBalance('ahmet-wallet');
console.log(`Bakiye: ${balance} coin`);

// 6. Blockchain geçerliliğini kontrol et
const isValid = myBlockchain.isChainValid();
console.log(`Geçerli: ${isValid}`);
```

### Gelişmiş İşlemler

```javascript
// Mining istatistikleri
const stats = myBlockchain.miningStats;
console.log(`Hash Rate: ${stats.averageHashRate} hash/s`);

// Difficulty ayarlama
myBlockchain.adjustDifficulty();

// Tüm adresleri listele
const addresses = myBlockchain.getAllAddresses();

// UTXO set'i yeniden oluştur
myBlockchain.rebuildUtxoSet();
```

## 📊 NPM Scripts

| Script | Açıklama | Platform |
|--------|----------|----------|
| `npm start` | Temel blockchain demo | Node.js |
| `npm run crypto` | Crypto-JS versiyonu | Node.js |
| `npm run node-crypto` | Native crypto versiyonu | Node.js |
| `npm run serve` | HTTP server başlat | Browser (legacy) |

### Browser (Vite) Scripts
```bash
cd browser
npm run dev          # Vite dev server
npm run build        # Production build
npm run preview      # Preview build
```

## 🔐 Güvenlik Özellikleri

### Hash Algoritması
- **SHA-256** kriptografik hash fonksiyonu
- Blockchain integrity kontrolü
- Transaction hash'leri

### Mining Sistemi
- **Proof of Work** consensus algoritması
- Nonce tabanlı mining
- Dynamic difficulty adjustment

### Validation
```javascript
// İşlem validasyonu
if (senderBalance < amount) {
    throw new Error('Yetersiz bakiye!');
}

// Hash validasyonu
if (currentBlock.hash !== currentBlock.calculateHash()) {
    return false;
}

// Chain validasyonu
if (currentBlock.previousHash !== previousBlock.hash) {
    return false;
}
```

## ⚡ Performans Karşılaştırması

| Platform | Hash Algorithm | Hash Rate | Memory Usage |
|----------|---------------|-----------|--------------|
| **Browser (Crypto-JS)** | CryptoJS.SHA256() | ~50K hash/s | Orta |
| **Node.js (Native)** | crypto.createHash() | ~110K hash/s | Düşük |

## 🎓 Eğitim İçeriği

Bu proje aşağıdaki blockchain kavramlarını öğretir:

### 1. Temel Kavramlar
- Block structure
- Hash functions
- Previous hash linking
- Genesis block

### 2. Mining & Consensus
- Proof of Work
- Nonce değeri
- Difficulty adjustment
- Hash rate calculation

### 3. Transaction Management
- UTXO (Unspent Transaction Output)
- Balance calculation
- Transaction validation
- Pending transactions

### 4. Advanced Topics
- Chain validation
- Fork handling
- Mining rewards
- Performance optimization

## 🛠️ Development

### Yeni Özellik Ekleme

```javascript
// Yeni transaction type eklemek için:
myBlockchain.createTransaction({
    fromAddress: 'sender',
    toAddress: 'receiver',
    amount: 100,
    type: 'transfer', // Yeni alan
    metadata: { ... } // Ek bilgiler
});
```

### Debug Mode

```javascript
// Detaylı loglama için
myBlockchain.debug = true;
myBlockchain.displayBlockchain();
```

## 🔧 Troubleshooting

### Yaygın Sorunlar

**Problem:** "Yetersiz bakiye" hatası
```javascript
// Çözüm: Önce mining yapın
myBlockchain.initializeBalances();
```

**Problem:** Hash uyumsuzluğu
```javascript
// Çözüm: Chain'i validate edin
const isValid = myBlockchain.isChainValid();
if (!isValid) {
    myBlockchain.rebuildUtxoSet();
}
```

**Problem:** Slow mining
```javascript
// Çözüm: Difficulty'yi azaltın
myBlockchain.difficulty = 1;
```

## 📝 License

MIT License - Eğitim amaçlı kullanım için serbesttir.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

Sorularınız için:
- 📧 Email: [your-email]
- 🐛 Issues: GitHub Issues
- 📖 Docs: README files

## 🎯 Roadmap

- [ ] Smart Contracts support
- [ ] Network layer (P2P)
- [ ] Merkle Tree implementation
- [ ] Multi-signature transactions
- [ ] WebAssembly optimization
- [ ] Mobile app interface

---

⭐ **Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**