import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import RefinementList from './RefinementList';

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
  },
});

const Filters = ({
  isModalOpen,
  searchState,
  searchClient,
  toggleModal,
  onSearchStateChange,
}) => (
  <Modal animationType="slide" visible={isModalOpen}>
    <SafeAreaView>
      <InstantSearch
        searchClient={searchClient}
        indexName="demo_ecommerce"
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <RefinementList attribute="brand" />
        <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </InstantSearch>
    </SafeAreaView>
  </Modal>
);

Filters.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  searchState: PropTypes.object.isRequired,
  searchClient: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSearchStateChange: PropTypes.func.isRequired,
};

export default Filters;
