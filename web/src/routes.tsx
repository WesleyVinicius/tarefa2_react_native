import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import CoachList from './pages/CoachList';
import CoachForm from './pages/CoachForm';

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={CoachList} />
      <Route path="/give-classes" component={CoachForm} />
    </BrowserRouter>
  );
}

export default Routes;