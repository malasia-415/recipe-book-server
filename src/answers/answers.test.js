import React from 'react';
import ReactDOM from 'react-dom';
// import answersRouter from './answer-router';
import AnswerService from './answer-service';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AnswerService />, div);
    ReactDOM.unmountComponentAtNode(div);
  });