import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import './CreateFood.css'
function CreateFood() {

  const initialValues = {
    Name: "",
    Protein: "",
    Fat: "", 
    Carb: ""
  }

  const validationSchema = Yup.object().shape({
    Name: Yup.string().min(3).max(20).required("Please enter a name between 3 and 20 characters."),
    Protein: Yup.number().required(),
    Fat: Yup.number().required(),
    Carb: Yup.number().required()
    
  });

  const onSubmit = (values) => { 
    axios.post('http://localhost:3001/food',values).then((response) => {
      console.log("Food created")
    })
  }

  return (
      <div className='CreateFoodContainer'>
          <div className='CreateFoodForm'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                  <label>Name: </label>
                  <ErrorMessage name="Name" component="span" />
                  <Field id="inputCreatefood" name="Name" placeholder="(ex: ga ran)" />
                  
                  <label>Protein: </label>
                  <Field id="inputCreatefood" name="Protein" placeholder="(ex: 10)" />
                  
                  <label>Fat: </label>
                  <Field id="inputCreatefood" name="Fat" placeholder="(ex: 10)" />
                  
                  <label>Carb: </label>
                  <Field id="inputCreatefood" name="Carb" placeholder="(ex: 10)" />
                  
                  <button type="submit" component="button">CREATE</button>
                </Form>
            </Formik>
            </div>
    </div>
  )
}

export default CreateFood
