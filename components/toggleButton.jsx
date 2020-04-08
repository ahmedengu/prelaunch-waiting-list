import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';


function ToggleButton({ id }) {
  const [expand, setExpand] = useState(false);
  const ToggleIcon = () => {
    const props = {
      color: '#ffab03b8',
    };
    if (expand) return <IoMdRemove {...props} />;
    return <IoMdAdd {...props} />;
  };
  const toggleExpandHandler = () => {
    setExpand(!expand);
  };
  return (
    <a
      href={`#${id}`}
      role="button"
      className="faq-panel-toggle-button"
      onClick={toggleExpandHandler}
      aria-controls={id}
      data-toggle="collapse"
      aria-expanded="false"
    >
      <ToggleIcon />
    </a>
  );
}
export default ToggleButton;

ToggleButton.propTypes = {
  id: PropTypes.string.isRequired,
};
