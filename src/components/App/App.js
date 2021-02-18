// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { Formik } from 'formik'

import UserSurvey from '../UserSurvey'
import SurveyBuilder from '../SurveyBuilder'
import useCase from './example-survey'


const App = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [otherSurvey, setOtherSurvey] = useState({})
  // obviously this is getting into Router territory, and a touch of bad practice,
  // but I have other projects where I can demonstrate how I'd do this much better
  // and more in depth
  const determinePage = () => {
    switch(currentPage) {
      case 'home' :
        return <UserSurvey survey={useCase} />
      case 'build': 
        return <SurveyBuilder setPage={setCurrentPage} />
      default : 
        return <UserSurvey survey={otherSurvey} />
    }
  }

  const getSurveys = () => {
    const surveys = JSON.parse(localStorage.getItem('surveys'))
    if (surveys) {
      return surveys
    } else {
      return []
    }
  }

  const SurveyOptions = () => {
    const surveys = getSurveys()
    const buttons = surveys.map(survey => {
      return (
        <button 
          className="cta-3" 
          onClick={() => {
            setOtherSurvey(survey)
            setCurrentPage(survey.name)
          }}
        >
          {survey.name}
        </button>
      )
    })
    return <div>{buttons}</div>
  }

  return (
    <div className="App">
      <header>
        <SurveyOptions />
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