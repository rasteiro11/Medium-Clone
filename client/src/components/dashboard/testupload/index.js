import React from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'



const TestUpload = () => {

    const formik = useFormik({
        initialValues: { archivo: '' },
        validationSchema: Yup.object({
            archivo: Yup.mixed().required('A file is reqiuired')
        }),
        onSubmit: (values) => {
            let formData = new FormData()
            formData.append("file", values.archivo)


            axios.post("/api/files/multerupload", formData, {
                header: { 'content-type': 'mulipart/form-data' }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        }
    })

    return (
        <AdminLayout section="Test upload">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                    <Form.File
                        id="file"
                        name="file"
                        label="Example File Input"
                        onChange={(event) => {
                            formik.setFieldValue("archivo", event.target.files[0])
                        }} />
                    {
                        formik.errors.archivo && formik.touched.archivo ?
                            <>Error</>
                            : null
                    }
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </AdminLayout>
    )
}

export default TestUpload