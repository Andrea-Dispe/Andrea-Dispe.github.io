import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useFormik, Formik } from "formik";
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface FormValues {
  parValue: number,
  coupon: number,
  yearsToMaturity: number,
  periodsAnnually: number,
  currentRate: number
}

// // custom validate function
// const validate = (values: FormValues) => {
//   const errors = {} as FormValues;

//   if (!values.parValue) {
//     errors.parValue = 'Required';
//   } else if (!Number(values.parValue)) {
//     errors.parValue = 'Must be a number';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// }

const initialValues = {
  parValue: 0,
  coupon: 0,
  yearsToMaturity: 0,
  periodsAnnually: 0,
  currentRate: 0
}

const validationSchema = Yup.object({
  parValue: Yup.number()
    .required('Cannot be empty')
    .positive('Must be a positive number'),
  coupon: Yup.number()
    .required('Cannot be empty')
    .positive('Must be a positive number'),
  yearsToMaturity: Yup.number()
    .required('Cannot be empty')
    .positive('Must be a positive number'),
  periodsAnnually: Yup.number()
    .required('Cannot be empty')
    .positive('Must be a positive number'),
  currentRate: Yup.number()
    .required('Cannot be empty')
    .positive('Must be a positive number'),
});


function App() {
  const [bondValue, setBondValue] = useState<string>("")


  const submitFnFacotory = (values: FormValues) => {
    let { parValue, coupon, yearsToMaturity, periodsAnnually, currentRate } = values;

    coupon = coupon / 100
    currentRate = currentRate / 100
    const couponYearlyPayment = coupon * parValue / periodsAnnually
    const nPeriods = yearsToMaturity * periodsAnnually

    const finalBondValue = (coupon / periodsAnnually * parValue) * (1 - (1 + currentRate / periodsAnnually) ** (- nPeriods)) / (currentRate / periodsAnnually) + parValue / ((1 + currentRate / periodsAnnually) ** nPeriods)
    // const finalBondValue = couponYearlyPayment * (1 - (1 + currentRate) ** -  n ) / currentRate  + (parValue / (1 + currentRate) ** n)

    let euro = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    });
    setBondValue(euro.format(finalBondValue))

  }

  return (
    <>

      <Container>
        <Stack className='d-flex align-item-center pt-5'>
          <div className='pb-5'>
            <div className='text-center pb-3'>
              <h1>Formula</h1>
              <h4>  C*  (1-(1+r)-n/r ) + F/(1+r)n </h4>

            </div>
            <ul className='list-unstyled'>
              <li>C = Bond rate to purchase date</li>
              <li>F = Par value of bond</li>
              <li>R = Current market interest rate</li>
              <li>N = No. of years till maturity</li>
              <li>P = No. of periods paid annually</li>


            </ul>

            <h5>How to calculate</h5>
            C is calculated C = Coupon rate * F / No. of coupon payments in a year
          </div>


          {/* Form */}
          <div>

            <Formik
              initialValues={initialValues}
              onSubmit={submitFnFacotory}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                values,
                touched,
                errors,
                isSubmitting,
              }) => {
                return (

                  <Form
                    onSubmit={handleSubmit}
                    onReset={handleReset}


                  >
                    <Row >
                      {/* <Stack gap={1}> */}

                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>F / Par Value</Form.Label>
                          <Form.Control
                            type="number"
                            id="parValue"
                            name="parValue"
                            onChange={handleChange}
                            // hnadleBlur will detect which field has been touched from the name attribute
                            onBlur={handleBlur}
                            value={values.parValue}
                          />
                          {touched.parValue && errors.parValue ? (
                            <div>{errors.parValue}</div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>C / Coupon (%)</Form.Label>
                          <Form.Control
                            type="number"
                            // type="percentage"

                            id="coupon"
                            name="coupon"
                            onChange={handleChange}
                            // hnadleBlur will detect which field has been touched from the name attribute
                            onBlur={handleBlur}
                            value={values.coupon}
                          />
                          {touched.coupon && errors.coupon ? (
                            <div>{errors.coupon}</div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>N. years to Mat.</Form.Label>
                          <Form.Control
                            type="number"
                            // type="percentage"

                            id="yearsToMaturity"
                            name="yearsToMaturity"
                            onChange={handleChange}
                            // hnadleBlur will detect which field has been touched from the name attribute
                            onBlur={handleBlur}
                            value={values.yearsToMaturity}
                          />
                          {touched.yearsToMaturity && errors.yearsToMaturity ? (
                            <div>{errors.yearsToMaturity}</div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>N. periods yearly</Form.Label>
                          <Form.Control
                            type="number"
                            // type="percentage"

                            id="periodsAnnually"
                            name="periodsAnnually"
                            onChange={handleChange}
                            // hnadleBlur will detect which field has been touched from the name attribute
                            onBlur={handleBlur}
                            value={values.periodsAnnually}
                          />
                          {touched.periodsAnnually && errors.periodsAnnually ? (
                            <div>{errors.periodsAnnually}</div>
                          ) : null}
                        </Form.Group>
                      </Col>

                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Current rate (%)</Form.Label>
                          <Form.Control
                            type="number"
                            // type="percentage"

                            id="currentRate"
                            name="currentRate"
                            onChange={handleChange}
                            // hnadleBlur will detect which field has been touched from the name attribute
                            onBlur={handleBlur}
                            value={values.currentRate}
                          />
                          {touched.currentRate && errors.currentRate ? (
                            <div>{errors.currentRate}</div>
                          ) : null}
                        </Form.Group>
                      </Col>



                      <Col md={6}>
                        <Stack direction="horizontal" gap={3}>

                          <Button variant="dark" type="reset">
                            Reset
                          </Button>

                          <Button
                          variant="primary"
                           type="submit"
                            // disabled={isSubmitting ? true : false}
                            >
                            Submit
                          </Button>
                        </Stack>

                      </Col>

                      <Col xs={12}>


                        <div className='pt-5 text-center'>
                          <h1>Actual Bond Value</h1>
                          <h4>
                            {bondValue ? bondValue : 0}
                          </h4>
                        </div>
                      </Col>


                      {/* </Stack> */}
                    </Row>
                  </Form>
                )
              }}


            </Formik>
          </div>
        </Stack>
      </Container>
    </>

  );
}

export default App;
