import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from './toggleButton';


function FaqQuestionCard(props) {
  const { faq, id } = props;
  const { q, a } = faq;
  const QuestionHeading = () => (
    <div className="faq-panel-heading">
      <ToggleButton id={id}>
        <p className="faq-panel-heading-label">{q}</p>
      </ToggleButton>
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
  faq: PropTypes.shape(
    {
      q: PropTypes.string,
      a: PropTypes.string,
    },
  ).isRequired,
  id: PropTypes.string.isRequired,
};
