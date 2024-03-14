import { adjustTokenName } from "./adjustTokenName";
import { getTokenKeyName } from "./getTokenKeyName";

export const getAliasVariableName = (
  variableId: string,
  isDTCGForamt: boolean,
  includeValueAliasString: boolean
) => {
  const variableObj = figma.variables.getVariableById(variableId) as Variable;
  const collectionObj = figma.variables.getVariableCollectionById(
    variableObj.variableCollectionId
  ) as VariableCollection;
  // const modesAmount = collectionObj.modes.length;

  const variableName = adjustTokenName(variableObj.name);
  const collectionName = adjustTokenName(collectionObj.name);

  // console.log("collectionObj", collectionObj);
  // console.log("modeName", modeName);
  // console.log("modesAmount", modesAmount);

  const valueKey = getTokenKeyName(isDTCGForamt).value;
  const isValueKeyIncluded = includeValueAliasString ? `.${valueKey}` : "";

  const variableParts = variableName.split("/").map((part) => adjustTokenName(part));
  const aliasName = `{${collectionName}.${variableParts.join(
    "."
  )}${isValueKeyIncluded}}`;

  return adjustTokenName(aliasName);
};
