import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Hit as AlgoliaHit } from '@algolia/client-search';
import {
  getHighlightedParts,
  getPropertyByPath,
} from 'instantsearch.js/es/lib/utils';

type HighlightPartProps = {
  children: React.ReactNode;
  isHighlighted: boolean;
};

function HighlightPart({ children, isHighlighted }: HighlightPartProps) {
  const styles = StyleSheet.create({
    highlight: {
      fontWeight: isHighlighted ? 'bold' : 'normal',
      backgroundColor: isHighlighted ? '#f5df4d' : 'transparent',
      color: isHighlighted ? '#6f6106' : 'black',
    },
  });

  return <Text style={styles.highlight}>{children}</Text>;
}

type HighlightProps<THit> = {
  hit: THit;
  attribute: keyof THit | string[];
  className?: string;
  separator?: string;
};

export function Highlight<THit extends AlgoliaHit<Record<string, unknown>>>({
  hit,
  attribute,
  separator = ', ',
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
                  isHighlighted={subPart.isHighlighted}
                >
                  {subPart.value}
                </HighlightPart>
              ))}

              {!isLastPart && separator}
            </Fragment>
          );
        }

        return (
          <HighlightPart key={partIndex} isHighlighted={part.isHighlighted}>
            {part.value}
          </HighlightPart>
        );
      })}
    </>
  );
}
