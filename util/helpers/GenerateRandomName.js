
export const GenerateRandomName = (nameLength) => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let proposedName = '';

  for (let i = 0; i < nameLength; i++) {
    const generate = Math.floor(Math.random() * letters.length);
    proposedName += letters[generate];
  }
  return proposedName;
}