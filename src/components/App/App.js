// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { Formik } from 'formik'

import UserSurvey from '../UserSurvey'
import SurveyBuilder from '../SurveyBuilder'
import useCase from './example-survey'


const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  // obviously this is getting into Router territory, 
  // but I have other projects where I can demonstrate how I'd do this much better
  // and more in depth
  const determinePage = () => {
    switch(currentPage) {
      case 'build': 
        return <SurveyBuilder />
      default : 
        return <UserSurvey survey={useCase} />
    }
  }

  return (
    <div className="App">
      <header>
        <button 
          className='cta-1'
          onClick={() => {setCurrentPage('build')}}
        >
          Create a Survey
        </button>
      </header>
      {determinePage()}
    </div>
  );
}

export default App;

// App
  // might be where we navigate through the survey
  // Survey component,
    // renders Q based on a provided object (recieved as a Prop)
    // navigates through them
      // Can I display one node at a time from React.Node[]?
      // If I can, using Formik validation, I iterate through each Q / lib  
    // renders answers as a ParagraphPreview
            // New Survey () - class for surveys, which I can create any amount of surveys 
            // EXTRA CREDIT: Survey - data model - object, maybe an array of objects 
              // {survey: [{question: , madlib: }, {...}]}, 
              // cerated by class
              // contains all questions / their mad-lib
  // Question
    // consume one Q at a time from the survey and create the form based on that
      // props? re-render new Q each time one is complete
  // ParagraphPreview
    // use some method to intake a Answer and the corresponding madlib  