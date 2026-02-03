import fs from 'fs-extra';


try {
  await fs.copy('../orak-util-ts/src', './src/orak-util-ts', { overwrite: true });
  console.log('Kopyalama tamamlandı!');
} catch (err) {
  console.error(err);
}