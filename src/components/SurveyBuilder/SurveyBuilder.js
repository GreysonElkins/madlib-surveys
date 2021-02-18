import { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, useFormikContext, useField } from 'formik'
import * as Yup from 'yup'

const SurveyBuilder = () => {
  const [questionCount, setQuestionCount] = useState(1)
  
  const initialValues = {name: ''}
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
    const [questionsIndex, setQuestionsIndex] = useState([])
    const [madLib, setMadLib] = useState([])

    const addElement = (type) => {
      setElementCount(prevElement => [...prevElement, type])
    }
    const addTextField = (madLib) => {
      setMadLib(prevLib => [...prevLib, madLib])
    }

    const printElements = () => {
      return elementCount.map((elementType , i) => {
        return (
          <>
            {elementType  === 'question' &&
              <label htmlFor={`${elementType }-${i}`}>Prompt:</label>
            }  
            <Field name={`${elementType }-${i}`} type="text"/>
          </>
        )
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

        {printElements()}
      </>
    )
  }

  return (
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({errors, touched}) => (
        <Form className="questions">
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
          <MadLibBuilder />
          <NextButton field="madlib" />
        </div>
        </Form>
      )}
    </Formik>
    )
}
  // const nameTheSurvey = () => (
  //   <>
  //     <div>We're going to build a mad-lib style survey!</div>
  //     <Formik
  //       initialValues={{name: ''}}
  //       validationSchema={Yup.object().shape({
  //         name: Yup.string()
  //           .required('Required')
  //           .max('20', 'Only 20 characters allowed')
  //       })}
  //       onSubmit={
  //         (values) => {
  //         newSurvey.name = values.name
  //         const nextQuestion = questionCount + 1
  //         setQuestionCount(nextQuestion)
  //       }}
  //     > 
  //     {({ values, errors, touched }) => (
  //       <Form className="questions">
  //       <label for="name">What would you like to call it? </label>
  //         <Field type="textarea" name="name" />
  //         <button className="cta-2" type="submit">next</button>
  //         {errors.name && touched.name ? (
  //         <div className="validation-error">{errors.name}</div>
  //       ) : null}
  //       </Form>
  //     )}
  //     </Formik>
  //   </>
  // )

  // const describeTheSurvey = () => (
  //   <Formik
  //       initialValues={{description: ''}}
  //       validationSchema={Yup.object().shape({
  //         description: Yup.string()
  //           .required('The description is required')
  //           .max('50', 'Only 50 characters allowed')
  //       })}
  //       onSubmit={
  //         (values) => {
  //         newSurvey.description = values.description
  //         const nextQuestion = questionCount + 1
  //         setQuestionCount(nextQuestion)
  //       }}
  //     > 
  //     {({ values, errors, touched }) => (
  //       <Form className="questions">
  //       <label for="description">What's the goal of your madlib survey? </label>
  //         <Field type="textarea" name="description" />
  //         <button className="cta-2" type="submit">next</button>
  //         {errors.description && touched.description ? (
  //         <div className="validation-error">{errors.description}</div>
  //       ) : null}
  //       </Form>
  //     )}
  //     </Formik>
  // )


  // return determineQuestion()
 
  




export default SurveyBuilder