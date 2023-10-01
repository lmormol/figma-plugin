export const groupObjectBySlashKeys = (obj: any) => {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const parts = key.split("/"); // Split the key by slash
      let currentObj = result;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!currentObj[part]) {
          // Create a nested object if it doesn't exist
          currentObj[part] = {};
        }

        if (i === parts.length - 1) {
          // If it's the last part of the key, assign the value
          currentObj[part] = obj[key];
        }

        currentObj = currentObj[part]; // Move to the next nested object
      }
    }
  }

  return result;
};
