import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectMenu } from 'react-instantsearch-dom';

class MenuSelect extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        isRefined: PropTypes.bool.isRequired,
      })
    ).isRequired,
    refine: PropTypes.func.isRequired,
  };

  onChange = event => {
    const { refine } = this.props;
    const value = event.currentTarget.value;

    if (value !== 'see_all_categories') {
      refine(value);
    } else {
      refine();
    }
  };

  render() {
    const { items } = this.props;
    const { value: selected } = items.find(item => item.isRefined) || {
      value: 'see_all_categories',
    };

    return (
      <select className="menu-select" value={selected} onChange={this.onChange}>
        <option value="see_all_categories">Select a categories</option>
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    );
  }
}

export default connectMenu(MenuSelect);
