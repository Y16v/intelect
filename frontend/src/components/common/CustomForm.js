import * as React from 'react';
import PropTypes from 'prop-types';

const CustomForm = ({onSubmit, children, ...otherProps}) =>
  (<form
    onKeyDown={
      (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSubmit();
        }
      }
    }

    onSubmit={
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        onSubmit();
      }
    }

    {...otherProps}
  >
    {children}
  </form>);

CustomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomForm;
