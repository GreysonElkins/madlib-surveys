// import logo from './logo.svg';
import './App.css';
import UserSurvey from '../UserSurvey'
import useCase from './example-survey'

const App = () => {
  return (
    <div className="App">
      <UserSurvey survey={useCase} />
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