# Sayı Bilmece

Sayı Bilmece, 4 haneli gizli bir şifreyi tahmin etmeye dayanan React Native / Expo tabanlı bir sayı bulmaca oyunudur. Oyuncu her tahminden sonra aldığı renkli geri bildirimlerle doğru rakamları ve doğru pozisyonları bulmaya çalışır.

## Amaç

Oyunun amacı, rakamları birbirinden farklı olan 4 haneli gizli sayıyı mümkün olan en az tahminle ve en kısa sürede bulmaktır.

## Oyun Modları

- **Açık Mod:** Her tahminde rakamların durumu doğrudan gösterilir.
- **Uzman Mod:** Tahmin edilen sayı açıkça listelenir, ancak rakam takip paneli kapalıdır. Sonuçlar yalnızca genel işaretlerle okunur.
- **Günlük Şifre:** Aynı gün içinde herkes için aynı gizli sayı üretilir.
- **Eşli Oyun:** Bluetooth bağlantısı üzerinden iki oyunculu oyun akışı için temel yapı içerir.

## Özellikler

- 4 haneli, rakamları tekrarsız gizli sayı üretimi
- Günlük şifre üretimi
- Tahmin geçmişi
- Renkli sonuç sistemi
- Skor, süre ve en iyi skor takibi
- Tek kullanımlık ipucu sistemi
- Açık modda kullanılan rakamlar paneli
- Uzman modda bilgi sızıntısını önleyen kapalı rakam paneli
- Neon terminal / şifre kasası teması
- Hareketli arka plan sinyal çizgileri
- Tahmin sonucu giriş animasyonu
- Web için hafif ses geri bildirimi
- Mobil için titreşim geri bildirimi

## Renk Kuralları

- **Yeşil çerçeve:** Rakam doğru ve pozisyon doğru
- **Sarı çerçeve:** Rakam doğru ama pozisyon yanlış
- **Soluk/gri:** Rakam gizli sayıda yok

## Kullanılan Teknolojiler

- React
- React Native
- Expo
- TypeScript
- React Native Web
- Expo Vector Icons
- Webpack
- react-native-bluetooth-serial-next

## Çalıştırma

Bağımlılıklar yüklüyse web sürümü şu komutla çalışır:

```bash
npm run web
```

Yerel ağdaki başka cihazlardan erişmek için aynı ağda şu format kullanılır:

```text
http://BILGISAYARIN_YEREL_IP_ADRESI:19006
```

## Geliştirme Notları

Web geliştirme sunucusu `scripts/start-web.js` üzerinden çalışır. Bu yapı, Expo CLI'nin bazı yeni Node sürümleriyle yaşadığı port bulma sorununu aşmak ve oyunu yerel ağda erişilebilir yapmak için kullanılır.

Eski Expo web komutu hâlâ saklanmıştır:

```bash
npm run web:expo
```
