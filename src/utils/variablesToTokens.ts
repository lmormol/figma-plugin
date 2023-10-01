import { normalizeValue } from "./normalizeValue";
import { normilizeType } from "./normilizeType";
import { getTokenKeyName } from "./getTokenKeyName";
import { groupObjectBySlashKeys } from "./groupObjectBySlashKeys";
import { wrapLastObjectInGroup } from "./wrapLastObjectInGroup";

import { groupObjectNamesIntoCategories } from "./groupObjectNamesIntoCategories";

// console.clear();

export const variablesToTokens = async (
  variables: Variable[],
  collections: VariableCollection[],
  JSONSettingsConfig: JSONSettingsConfigI
) => {
  const colorMode = JSONSettingsConfig.colorMode;
  const isDTCGForamt = JSONSettingsConfig.useDTCGKeys;
  const includeValueAliasString = JSONSettingsConfig.includeValueAliasString;
  const keyNames = getTokenKeyName(isDTCGForamt);

  const mergedVariables = {};

  console.log("collections", collections);

  collections.forEach((collection) => {
    // let modes = {};
    let objects = {};

    const collectionName = collection.name;
    const isScopesIncluded = JSONSettingsConfig.includeScopes;
    const modesAmount = collection.modes.length;

    collection.modes.forEach((mode, index) => {
      const modeName = mode.name;

      console.log("modeName", modeName);
      console.log("variables", variables);

      const variablesPerMode = variables.reduce((result, variable) => {
        const variableModeId = Object.keys(variable.valuesByMode)[index];

        // console.log("variable", variable);

        if (variableModeId === mode.modeId) {
          const variableObject = {
            [keyNames.type]: normilizeType(variable.resolvedType),
            [keyNames.value]: normalizeValue({
              modeName,
              variableType: variable.resolvedType,
              variableValue: variable.valuesByMode[variableModeId],
              colorMode,
              isDTCGForamt,
              includeValueAliasString,
            }),
            [keyNames.description]: variable.description,
            // add scopes if true
            ...(isScopesIncluded && {
              scopes: variable.scopes,
            }),
            // add meta
            $extensions: {
              variableId: variable.id,
            },
          } as PluginTokenI;

          console.log("modeName", modeName);

          const variableName =
            modesAmount === 1 ? variable.name : `${variable.name}/${modeName}`;

          result[variableName] = variableObject;
        }

        return result;
      }, {});

      console.log("variablesPerMode", Object.keys(variablesPerMode)[0]);

      Object.assign(objects, variablesPerMode);
    });

    console.log("objects", objects);
    console.log(">>>>>>>>>>>>>>>>>>>");

    mergedVariables[collectionName] = groupObjectBySlashKeys(objects);
  });

  return mergedVariables;
};
