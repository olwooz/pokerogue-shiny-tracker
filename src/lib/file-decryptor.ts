import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = 'x0i2O7WRiANTqPmZ';

const FIELD_MAPPINGS: Record<string, string> = {
  $sa: 'seenAttr',
  $ca: 'caughtAttr',
  $na: 'natureAttr',
  $s: 'seenCount',
  $c: 'caughtCount',
  $hc: 'hatchedCount',
  $i: 'ivs',
  $em: 'eggMoves',
};

function convertFieldNames(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertFieldNames);
  }

  const converted: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = FIELD_MAPPINGS[key] || key;
    converted[newKey] = convertFieldNames(value);
  }

  return converted;
}

export async function decryptPrsvFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;

        if (!fileContent) {
          reject(new Error('Failed to read file content'));
          return;
        }

        const decrypted = CryptoJS.AES.decrypt(fileContent, ENCRYPTION_KEY);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);

        if (!plaintext) {
          reject(
            new Error(
              'Failed to decrypt file. Invalid encryption or corrupted file.'
            )
          );
          return;
        }

        const parsed = JSON.parse(plaintext);
        const converted = convertFieldNames(parsed);

        resolve(JSON.stringify(converted));
      } catch (error) {
        reject(
          new Error(
            "Failed to decrypt or parse the file. Make sure it's a valid .prsv file."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };

    reader.readAsText(file);
  });
}
