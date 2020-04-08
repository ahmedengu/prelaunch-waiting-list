import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from './toggleButton';


function FaqQuestionCard(props) {
  const { faq, id } = props;
  const { q, a } = faq;
  const QuestionHeading = () => (
    <div className="faq-panel-heading">
      <p className="faq-panel-heading-label">{q}</p>
      <ToggleButton id={id} />
    </div>
  );
  const QuestionAnswer = () => (
    <div
      id={id}
      className="faq-panel-desc collapse"
    >
      {a}
    </div>
  );

  return (
    <div className="faq-panel">
      <QuestionHeading />
      <QuestionAnswer />
    </div>
  );
}
export default FaqQuestionCard;

FaqQuestionCard.propTypes = {
  faq: PropTypes.objectOf({
    q: PropTypes.string.isRequired,
    a: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};
