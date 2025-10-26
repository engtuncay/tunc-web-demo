# TypeScript Blockchain Demo - Vite Edition

Bu proje bir blockchain implementasyonudur. Vite bundler kullanarak modern web teknolojileri ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ **TypeScript**: Güçlü tip sistemi ve kod güvenliği
- ✅ **Vite Bundler**: Hızlı geliştirme ve build süreçleri
- ✅ **SHA-256 Hash**: Güvenli kriptografik hash algoritması
- ✅ **Proof of Work**: Mining sistemi ve difficulty ayarlaması
- ✅ **UTXO Sistemi**: Modern blockchain mimarisi
- ✅ **Hot Module Replacement**: Geliştirme sürecinde hızlı yeniden yükleme
- ✅ **Transaction Yönetimi**: İşlem oluşturma ve doğrulama
- ✅ **Mining İstatistikleri**: Performans takibi

## 📦 TypeScript Dönüşümü

### Eklenen Type Definitions
- `BlockData`: Blok verisi için interface
- `MiningResult`: Mining sonuçları için interface
- `Transaction`: İşlem verileri için interface
- `MiningStats`: Mining istatistikleri için interface
- `ViteBuildInfo`: Vite build bilgileri için interface
- `BalanceInfo`: Bakiye bilgileri için interface

### Güçlü Tip Sistemi
- Tüm fonksiyonlar için dönüş tipi belirtildi
- DOM manipülasyonları için güvenli element erişimi
- Null/undefined kontrolleri eklendi
- Error handling için tip güvenli yaklaşım

### Geliştirici Deneyimi
- IDE auto-completion desteği
- Compile-time error detection
- Code refactoring güvenliği
- IntelliSense desteği

## 🛠 Kurulum

```bash
# Dependencies'leri yükle
npm install
# veya
pnpm install

# Geliştirme sunucusunu başlat
npx vite
# veya
npm run dev
```

## 📝 Kullanım

1. **Başlangıç Bakiyelerini Oluştur**: Test cüzdanları için başlangıç bakiyelerini oluşturur
2. **İşlem Oluştur**: Adresler arası coin transferi yapılır
3. **Mining**: Bekleyen işlemler blockchain'e eklenir
4. **Bakiye Kontrol**: Herhangi bir adresin bakiyesi sorgulanabilir
5. **Blockchain Görüntüle**: Tüm bloklar ve işlemler görüntülenir

## 🏗 Mimari

### Block Sınıfı (`block-vite.ts`)

```typescript
export class Block {
  public timestamp: number
  public data: BlockData[] | string
  public previousHash: string
  public hash: string
  public nonce: number
  
  constructor(timestamp: number, data: BlockData[] | string, previousHash = '')
  calculateHash(): string
  mineBlock(difficulty: number): MiningResult
  isValidHash(difficulty: number): boolean
}
```

### Blockchain Sınıfı (`blockchain-vite.ts`)
```typescript
export class Blockchain {
  public chain: Block[]
  public difficulty: number
  public pendingTransactions: Transaction[]
  
  // GÜVENLIK: Private UTXO Set - Güvenli getter metodları ile erişim
  private utxoSet: Map<string, number>
  public miningStats: MiningStats
  
  minePendingTransactions(miningRewardAddress: string): MiningResult
  createTransaction(transaction: Transaction): void
  getBalance(address: string): number
  getUtxoSet(): ReadonlyMap<string, number>  // Immutable kopya döndürür
  getUtxoSetAsObject(): Record<string, number>  // Display için
  isChainValid(): boolean
}
```

## 🔧 TypeScript Konfigürasyonu

### `tsconfig.json`
- Target: ES2020
- Module: ESNext  
- Strict mode aktif
- DOM types dahil
- Vite client types

### `vite.config.ts`
- TypeScript desteği
- Hot Module Replacement
- Production optimizasyonları
- Legacy browser desteği

## 📊 Performans

- **UTXO Set**: O(1) bakiye sorgulama
- **Memory Efficient**: Optimize edilmiş veri yapıları
- **Mining Stats**: Hash rate ve süre takibi
- **Tree Shaking**: Kullanılmayan kod eliminasyonu

## 🔐 Güvenlik

- SHA-256 kriptografik hash
- Transaction hash doğrulama
- **Private UTXO Set**: Dışarıdan manipülasyon engellendi
- **Immutable Data Access**: ReadonlyMap ile güvenli veri erişimi
- **Encapsulation**: Sadece getter metodlarıyla kontrollü erişim
- Blockchain integrity kontrolü
- Input validation
- Type-safe DOM manipülasyonları

> 📝 Detaylı UTXO güvenlik açıklaması için: [SECURITY-UTXO.md](./SECURITY-UTXO.md)

## 🎛 Geliştirme

```bash
# TypeScript derlemesi
npx tsc --noEmit

# Build (production)
npx vite build

# Preview build
npx vite preview
```

## 📄 Dosya Yapısı

```
blockchain-ts/
├── block-vite.ts                 # Block sınıf tanımı
├── blockchain-vite.ts            # Blockchain sınıf tanımı  
├── main.ts                       # Ana uygulama entry point
├── p2p-node-example.ts           # P2P node implementation örneği
├── vite.config.ts                # Vite konfigürasyonu
├── tsconfig.json                 # TypeScript konfigürasyonu
├── vite-env.d.ts                 # Vite environment types
├── index.html                    # HTML template
├── style.css                     # Stiller
├── package.json                  # Proje bağımlılıkları
├── SECURITY-UTXO.md              # UTXO güvenlik dokümantasyonu
└── DISTRIBUTED-CONSENSUS.md      # Multi-node consensus açıklaması
```

## 🌐 Distributed Blockchain

### Mevcut Durum: Single Node
Bu proje şu anda **tek node** (single instance) olarak çalışıyor. Gerçek blockchain'lerde:

- **Binlerce node** aynı anda çalışır
- Her node tam blockchain kopyasına sahiptir
- **Consensus mekanizmaları** ile tutarlılık sağlanır
- Fork'lar (chain splitting) otomatik çözülür

### Bakiye Tutarlılığı Nasıl Sağlanır?

1. **Deterministic Rules**: Her node aynı kuralları uygular
   ```typescript
   // Aynı transaction'lar → Aynı UTXO set
   processBlock(block) // Tüm node'larda aynı sonuç
   ```

2. **Independent Verification**: Her node tüm block'ları doğrular
   ```typescript
   if (!isValidBlock(block)) reject()
   ```

3. **Consensus Algorithms**:
   - **Proof of Work** (Bitcoin): En uzun chain kazanır
   - **Proof of Stake** (Ethereum): Validator attestation
   - **BFT** (Tendermint): 2/3 majority vote

> 📝 Detaylı multi-node consensus açıklaması: [DISTRIBUTED-CONSENSUS.md](./DISTRIBUTED-CONSENSUS.md)

## 🌟 TypeScript Avantajları

1. **Tip Güvenliği**: Compile-time error detection
2. **IntelliSense**: Gelişmiş code completion
3. **Refactoring**: Güvenli kod yeniden düzenleme
4. **Dökümantasyon**: Interface'ler kod dokümantasyonu sağlar
5. **Bakım**: Büyük projelerde kod bakımı kolaylaşır

Bu proje, blockchain teknolojisini TypeScript'in güçlü tip sistemi ile kombine ederek modern web geliştirme best practice'lerini göstermektedir.