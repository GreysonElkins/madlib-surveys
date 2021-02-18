## ReadMe  

This was a code challenge, and here's a bit of reflection on it. 

The goal was to to quickly implement new technologies, `Formik` and `Yup`. I realized that my instinct when approaching a new technology in a short period of time is to see how quickly I can break it. I think I did pretty well! 

Notice in the `UserSurvey` component, every time the Next button is clicked, we validate the entire form. This was because Formik's `validateForm()` will return and object errors, where as `validateField()` never does. The `if/else` that followed this validation was able to prevent the next question from rendering, but I also had to manually `setFieldError` to get errors to populate.

On the branch `survey-builder`, I took a different approach. Formik also offers a method called `setFieldTouched()` which triggers validation by flagging specific fields as touched. Using this method required less manual form control. On this branch I also explored `useFormikContext()` which allowed me to inject `formikBag` values into `useEffect`.

While this branch successfully creates and offers users other surveys, it still highlights three areas for growth: 
  * When you `Finish` the survey's creation, there is plenty of opportunity for un-checked error - this was an issue of time
  * While the `MadLibBuilder` seems to be able to create errors and provide validation for new fields, I don't believe they're actually validating. *how do we approach dynamically rendered `Fields` with validation?*
  * The survey's aren't actually takeable, which seems to be an issue with the `Schema`, but again, time didn't allow for further exploration.

