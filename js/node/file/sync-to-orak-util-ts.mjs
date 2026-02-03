import fs from 'fs-extra';

try {
  await fs.copy('./src/orak-util-ts', '../orak-util-ts/src', { overwrite: true });
  console.log('Kopyalama tamamlandı!');
} catch (err) {
  console.error(err);
}