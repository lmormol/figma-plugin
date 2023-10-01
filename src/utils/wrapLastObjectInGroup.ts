export const wrapLastObjectInGroup = (jsonObject: any, groupName: string) => {
  // Get the keys of the jsonObject
  const keys = Object.keys(jsonObject);

  // Get the last key in the keys array
  const lastKey = keys[keys.length - 1];

  // Create the new group object
  const newGroup = {
    [groupName]: jsonObject[lastKey],
  };

  // Delete the lastKey from the jsonObject
  delete jsonObject[lastKey];

  // Add the new group object to the jsonObject
  jsonObject[lastKey] = newGroup;

  return jsonObject;
};
