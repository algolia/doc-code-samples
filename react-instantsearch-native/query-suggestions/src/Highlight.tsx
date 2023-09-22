import React, { Fragment } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';

type HighlightPartProps = {
  children: React.ReactNode;
  style: StyleProp<TextStyle>;
};

function HighlightPart({ children, style }: HighlightPartProps) {
  return <Text style={style}>{children}</Text>;
}

type HighlightProps<THit> = {
  hit: THit;
  attribute: keyof THit | string[];
  className?: string;
  separator?: string;
  highlightedStyle?: StyleProp<TextStyle>;
  nonHighlightedStyle?: StyleProp<TextStyle>;
};

export function Highlight<THit extends AlgoliaHit<Record<string, unknown>>>({
  hit,
  attribute,
  separator = ', ',
  highlightedStyle = styles.highlighted,
  nonHighlightedStyle = styles.nonHighlighted,
}: HighlightProps<THit>) {
  const { value: attributeValue = '' } =
    getPropertyByPath(hit._highlightResult, attribute as string) || {};
  const parts = getHighlightedParts(attributeValue);

  return (
    <>
      {parts.map((part, partIndex) => {
        if (Array.isArray(part)) {
          const isLastPart = partIndex === parts.length - 1;

          return (
            <Fragment key={partIndex}>
              {part.map((subPart, subPartIndex) => (
                <HighlightPart
                  key={subPartIndex}
                  style={
                    subPart.isHighlighted
                      ? highlightedStyle
                      : nonHighlightedStyle
                  }
                >
                  {subPart.value}
                </HighlightPart>
              ))}

              {!isLastPart && separator}
            </Fragment>
          );
        }

        return (
          <HighlightPart
            key={partIndex}
            style={part.isHighlighted ? highlightedStyle : nonHighlightedStyle}
          >
            {part.value}
          </HighlightPart>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  highlighted: {
    fontWeight: 'bold',
    backgroundColor: '#f5df4d',
    color: '#6f6106',
  },
  nonHighlighted: {
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    color: 'black',
  },
});
