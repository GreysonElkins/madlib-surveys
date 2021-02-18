import { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, useFormikContext, useField } from 'formik'
import * as Yup from 'yup'

import Survey from './Survey'
import './SurveyBuilder.css'

const SurveyBuilder = ({ setPage }) => {
  const [questionCount, setQuestionCount] = useState(1)
  const [initialValues, setInitialValues] = useState({
    name: '', 
    description: '',
    questions: [],
    madlib: []
  })

  // const initialValues = {name: ''}
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .max('20', '20 char limit'),
    description: Yup.string()
      .required('Required')
      .max('50', '50 char limit')
  })
  
  const NextButton = ({ field }) => {
    const { setFieldError, setFieldTouched } = useFormikContext()
    const handleClick = () => {
      setFieldTouched({field: field, isTouched: true, shouldValidate: true})
      .then(result => {
        if (result[field]) {
          //THIS is the method I should have been using
          setFieldError({field: field, errorMsg: result.name})
        } else {
          const nextQuestion = questionCount + 1
          setQuestionCount(nextQuestion)
        }
      })   
    }
      return (
      <button 
        className="cta-2" 
        type="button" 
        onClick={() => handleClick()}
      >
        next
      </button>
    )
  }

    const ErrorToken = ({ place }) => {
      const [field, meta] = useField(place)
      return <div className="validation-error" name={field.name}>{meta.error}</div>
    }
    
  const MadLibBuilder = () => {
    const [elementCount, setElementCount] = useState([])
    const [madLib, setMadLib] = useState([])
    const { errors, values, setValues } = useFormikContext()

    const validateQuestions = (count) => {
      if (!values.questions[count]) {
        errors.questions = []
        errors.questions[count] = 'Required'
      }
      return errors
    }

    const validateMadLib = (index) => {
      if (!values.madlib[index]) {
        errors.madlib = []
        errors.madlib[index] = 'Required'
      } 
      // else if (values.madlib[index].length > 50) {
      //   errors.madlib[index] = "That's too many characters"
      // } 
      return errors
    }

    const addElement = (type) => {
      setElementCount(prevElement => [...prevElement, type])
    }
    const addTextField = (madLib) => {
      setMadLib(prevLib => [...prevLib, madLib])
    }

    const printElements = () => {
      let questionCount = 0;
      return elementCount.map((elementType , i) => {
        if (elementType === 'question') {
          questionCount++
          values.madlib[i] = questionCount
          return (
            <>
              <label htmlFor={`questions[${questionCount - 1}]`}>Prompt:</label>
              <Field name={`questions[${questionCount - 1}]`} validate={validateQuestions(parseInt(values.questions.length))} type="text"/>
            </>
          )
        } else {
          return (
            <Field name={`madlib[${parseInt(i)}]`} validate={validateMadLib(parseInt(i))} type="text"/>
          )
        }
      })
    }

    return (
      <>
        <div>Click "type" to write your madlib, click "blank" to create question to prompt the survey taker with:</div>
        
        <button 
          type="button" 
          onClick={() => {
            addElement('text')
          }}
        >Type</button>
        <button 
          type="button" 
          onClick={() => {
            addElement('question')
            addTextField()
          }}
        >Blank</button>
        <div className="mad-lib-box">
          {printElements()}
        </div>
      </>
    )
  }

  const storeSurvey = (survey) => {
    let surveys = JSON.parse(localStorage.getItem('surveys'))
    if (!surveys) surveys = []
    surveys.push(survey)
    localStorage.setItem(`surveys`, JSON.stringify(surveys))
  }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    >
      {({values, errors, touched, resetForm}) => (
        <Form 
        className="questions builder"
        onSubmit={(event) => {
          event.preventDefault()
          const finishedSurvey = new Survey(values)
          storeSurvey(finishedSurvey)
          resetForm()
          setPage('home')
          }}
        >
        <div className={questionCount !== 1 ? 'hidden' : ''}>
          <div>Let's build your mad-lib style survey!</div>
          <label htmlFor="name">What would you like to call it? </label>
          <Field type="textarea" name="name" />
          <ErrorToken place="name" />
          <NextButton field="name" />
        </div>
        <div className={questionCount !== 2 ? 'hidden' : ''}>
          <label htmlFor="description">
            What's your madlib survey trying accomplish?
          </label>
          <Field type="textarea" name="description" />
          <ErrorToken place="description" />
          <NextButton field="description" />
        </div>
        <div className={questionCount !== 3 ? 'hidden' : ''}>
          <MadLibBuilder values={values}/>
          {/* this moment has a ton of work needed with error handling */}
          <button type="submit" className="cta-1">Finish</button>
        </div>
        </Form>
      )}
    </Formik>
  )
}

export default SurveyBuilder