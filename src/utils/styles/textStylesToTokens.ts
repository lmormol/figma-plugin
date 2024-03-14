import { groupObjectNamesIntoCategories } from "../groupObjectNamesIntoCategories";

import { getLineHeight } from "../text/getLineHeight";
import { getLetterSpacing } from "../text/getLetterSpacing";
import { getFontWeight } from "../text/getFontWeight";
import { getTokenKeyName } from "../getTokenKeyName";
import { adjustTokenName } from "../adjustTokenName";

export const textStylesToTokens = async (
  customName: string,
  isDTCGForamt: boolean
) => {
  const keyNames = getTokenKeyName(isDTCGForamt);
  const textStyles = figma.getLocalTextStyles();

  console.log("textStyles length", textStyles.length);

  let textTokens = {};

  const allTextStyles = textStyles.reduce((result, style) => {
    const styleName = adjustTokenName(style.name);

    const styleObject = {
      [keyNames.type]: "typography",
      [keyNames.value]: {
        fontFamily: style.fontName.family,
        fontWeight: getFontWeight(style.fontName.style),
        fontSize: `${style.fontSize}px`,
        lineHeight: getLineHeight(style.lineHeight),
        letterSpacing: getLetterSpacing(style.letterSpacing),
        textDecoration: style.textDecoration,
        textCase: style.textCase
      },
      [keyNames.description]: style.description,
      $extensions: {
        styleId: style.id,
      },
    } as unknown as TypographyTokenI;

    result[styleName] = styleObject;

    return result;
  }, {});

  // console.log("allTextStyles", allTextStyles);

  textTokens[customName] = groupObjectNamesIntoCategories(allTextStyles);

  return textTokens;
};
