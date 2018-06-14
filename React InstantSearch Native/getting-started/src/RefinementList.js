import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
  },
  list: {
    marginTop: 20,
  },
  item: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  itemCount: {
    backgroundColor: '#252b33',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 7.5,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

const RefinementList = ({ items, refine }) => (
  <View style={styles.container}>
    <View style={styles.title}>
      <Text style={styles.titleText}>Brand</Text>
    </View>
    <View style={styles.list}>
      {items.map(item => {
        const labelStyle = {
          fontSize: 16,
          fontWeight: item.isRefined ? '800' : '400',
        };

        return (
          <TouchableOpacity
            key={item.value}
            onPress={() => refine(item.value)}
            style={styles.item}
          >
            <Text style={labelStyle}>{item.label}</Text>
            <View style={styles.itemCount}>
              <Text style={styles.itemCountText}>{item.count}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const ItemPropType = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

RefinementList.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectRefinementList(RefinementList);
