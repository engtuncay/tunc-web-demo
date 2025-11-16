#!/usr/bin/env node

/**
 * WhatsApp Web Mesaj Gönderici (ESM)
 * 
 * Kullanım:
 * node wsmessage.js 905551234567 "Merhaba!"
 */

import { spawn } from 'child_process';

/**
 * Telefon numarasını formatlama
 * @param {string} phoneNumber - Telefon numarası
 * @returns {string} - Formatlı telefon numarası
 */
export function formatPhoneNumber(phoneNumber) {
    // Sadece rakamları al
    let clean = phoneNumber.replace(/\D/g, '');

    // 0 ile başlıyorsa kaldır
    if (clean.startsWith('0')) {
        clean = clean.substring(1);
    }

    // Ülke kodu ekle (Türkiye - 90)
    if (!clean.startsWith('90')) {
        clean = '90' + clean;
    }

    return clean;
}

/**
 * WhatsApp Web URL oluştur
 * @param {string} phoneNumber - Telefon numarası
 * @param {string} message - Mesaj
 * @returns {string} - WhatsApp Web URL
 */
export function generateWhatsAppURL(phoneNumber, message) {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    // Temizle: başta/sonda kullanıcı tarafından eklenmiş olabilecek tek veya çift tırnakları kaldır
    let cleanMessage = (message || '').toString().trim();
    if ((cleanMessage.startsWith('"') && cleanMessage.endsWith('"')) ||
        (cleanMessage.startsWith("'") && cleanMessage.endsWith("'"))) {
        cleanMessage = cleanMessage.slice(1, -1);
    }
    // Ayrıca tek başına başta veya sondaki tırnakları da kaldır (çok katı değil)
    cleanMessage = cleanMessage.replace(/^['"]|['"]$/g, '');

    const encodedMessage = encodeURIComponent(cleanMessage);
    // On Windows use wa.me short link to avoid cmd parsing issues with '&'
    if (process.platform === 'win32') {
        return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
        //return `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
    }

    return `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
}

/**
 * Browser'ı aç
 * @param {string} url - Açılacak URL
 */
export function openBrowser(url) {
    try {
        // Hazırlık: hangi komutun çalıştırılacağını ve argümanlarını oluştur
        let cmd = null;
        let args = [];

        if (process.platform === 'win32') {
            // Windows: cmd /c start "" "<url>"
            cmd = 'cmd';
            args = ['/c', 'start', '', url];
        }
        else if (process.platform === 'darwin') {
            cmd = 'open';
            args = [url];
        }
        else {
            cmd = 'xdg-open';
            args = [url];
        }

        // Log the exact command we'll run so user can see it in terminal
        console.log('Running command:', cmd, args.map(a => (a.includes(' ') ? `"${a}"` : a)).join(' '));

        // Spawn the process and capture stdout/stderr so we can log any output
        const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });

        if (child.stdout) {
            child.stdout.on('data', (data) => {
                process.stdout.write(`[child stdout] ${data}`);
            });
        }

        if (child.stderr) {
            child.stderr.on('data', (data) => {
                process.stderr.write(`[child stderr] ${data}`);
            });
        }

        child.on('error', (err) => {
            console.error('Failed to start browser command:', err.message);
        });

        child.on('close', (code) => {
            console.log(`Child process exited with code ${code}`);
        });
    } catch (error) {
        console.error('Browser açılamadı:', error.message);
    }
}

/**
 * Ana fonksiyon
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length < 2) {
        console.log('\n📱 WhatsApp Web Mesaj Gönderici\n');
        console.log('Kullanım: node wsmessage.js <telefon> "<mesaj>"\n');
        console.log('Örnek:');
        console.log('  node wsmessage.js 905551234567 "Merhaba!"');
        console.log('  node wsmessage.js "0555 123 4567" "Nasılsın?"\n');
        process.exit(1);
    }

    const phoneNumber = args[0];
    const message = args.slice(1).join(' ');

    if (!phoneNumber || !message) {
        console.log('❌ Telefon numarası ve mesaj gereklidir!');
        process.exit(1);
    }

    try {
        const whatsappURL = generateWhatsAppURL(phoneNumber, message);
        const formattedPhone = formatPhoneNumber(phoneNumber);

        console.log('\n✅ WhatsApp Web açılıyor...');
        console.log(`📞 Alıcı: +${formattedPhone}`);
        console.log(`💬 Mesaj: ${message}`);
        console.log(`🔗 URL: ${whatsappURL}\n`);

        // Browser'ı aç
        openBrowser(whatsappURL);
        
        console.log('✓ Browser açıldı.');
        console.log('⏳ Lütfen bekleyin... WhatsApp Web yükleniyor.');
        console.log('📤 Mesajı göndermek için GÖNDER butonuna tıklayın.\n');

    } catch (error) {
        console.error('❌ Hata:', error.message);
        process.exit(1);
    }
}

// Çalıştır
main();
