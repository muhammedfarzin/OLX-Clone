import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import LoadingPage from './LoadingPage';

const CreatePage = () => {
  return (
    <Fragment>
      <LoadingPage/>
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
