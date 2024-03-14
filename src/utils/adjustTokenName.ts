export const adjustTokenName = (name: string) => {
    // Change spaces into dashed
    let modifiedStr = name.replace(/\s/g, '-');
    
    // Set all characters to lowercase
    return modifiedStr.toLowerCase();
};
  