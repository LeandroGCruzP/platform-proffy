import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import TeacherList from '../pages/TeacherList';
import TeacherForm from '../pages/TeacherForm';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route exact path="/give-classes" component={ TeacherList } />
        <Route exact path="/study" component={ TeacherForm } />
      </Switch>
    </BrowserRouter>
  );

}