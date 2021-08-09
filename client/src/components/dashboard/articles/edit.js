import React, { useState, useRef, useEffect } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { useFormik, FieldArray, FormikProvider } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminArticle, updateArticle, getCategories } from '../../../store/actions/article_actions'
import { validation, formValues } from './validationSchema'
import Loader from '../../../utils/loader'


import WYSIWYG from '../../../utils/form/wysiwyg'

import {
    TextField,
    Button,
    Divider,
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { clearCurrentArticle } from '../../../store/actions'

const EditArticle = (props) => {
    const dispatch = useDispatch()
    const notifications = useSelector(state => state.notifications)
    const articles = useSelector(state => state.articles)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [editorBlur, setEditorBlur] = useState(false)
    const [formData, setFormData] = useState(formValues)
    const actorsValue = useRef('')

    const [editContent, setEditContent] = useState(null)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formData,
        validationSchema: validation,
        onSubmit: (values, { resetForm }) => {
            setIsSubmitting(true)
            dispatch(updateArticle(values, props.match.params.id))
        }
    })

    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true)
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    useEffect(() => {
        // if (notifications && notifications.success) {
        //     props.history.push('/dashboard/articles')
        // }
        // if (notifications && notifications.error) {
        setIsSubmitting(false)
        // }
    }, [notifications, props.history])

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getAdminArticle(props.match.params.id))
    }, [dispatch, props.match.params])
    useEffect(() => {
        if (articles && articles.current) {
            setFormData(articles.current)
            setEditContent(articles.current.content)
        }
    }, [articles])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentArticle())
        }
    }, [dispatch])

    return (

        <AdminLayout section="Add article">
            {isSubmitting ?
                <Loader />

                : <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="title"
                            label="Enter a title"
                            variant="outlined"
                            {...formik.getFieldProps('title')}
                            {...errorHelper(formik, 'title')}
                        />
                    </div>

                    <div className="form-group">
                        <WYSIWYG
                            setEditorState={(state) => handleEditorState(state)}
                            setEditorBlur={(blur) => handleEditorBlur(blur)}
                            editContent={editContent}
                        />
                        {formik.errors.content && editorBlur ?
                            <FormHelperText error={true}>
                                {formik.errors.content}
                            </FormHelperText>
                            : null}
                        <TextField
                            //type="hidden"
                            name="content"
                            {...formik.getFieldProps('content')}
                        />
                    </div>


                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="excerpt"
                            label="Enter an excerpt"
                            variant="outlined"
                            {...formik.getFieldProps('excerpt')}
                            {...errorHelper(formik, 'excerpt')}
                            multiline
                            rows={4}
                        />
                    </div>
                    <Divider className="mt-3 mb-3" />
                    <h5>Movie Data and score</h5>
                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="score"
                            label="Enter an score"
                            variant="outlined"
                            {...formik.getFieldProps('score')}
                            {...errorHelper(formik, 'score')}
                            multiline

                        />
                    </div>

                    <FormikProvider value={formik}>
                        <h5>Add the Actors</h5>
                        <FieldArray
                            name="actors"
                            render={
                                arrayhelpers => (
                                    <div>
                                        <Paper className="actors_form">
                                            <InputBase
                                                inputRef={actorsValue}
                                                className="input"
                                                placeholder="Add actor name here"
                                            />
                                            <IconButton onClick={() => {
                                                arrayhelpers.push(actorsValue.current.value)
                                                actorsValue.current.value = ''
                                            }
                                            }>
                                                <AddIcon />
                                            </IconButton>
                                        </Paper>
                                        {formik.errors.actors && formik.touched.actors ?
                                            <FormHelperText error={true}>
                                                {formik.errors.actors}
                                            </FormHelperText>
                                            : null}
                                        <div className="chip_container">
                                            {formik.values.actors.map((actor, index) => (
                                                <div key={index}>
                                                    <Chip
                                                        label={`${actor}`}
                                                        color="primary"
                                                        onDelete={() => arrayhelpers.remove(index)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                )}
                        />

                    </FormikProvider>





                    <div className="form-group">
                        <TextField
                            style={{ width: '100%' }}
                            name="director"
                            label="Enter an director"
                            variant="outlined"
                            {...formik.getFieldProps('director')}
                            {...errorHelper(formik, 'director')}
                            multiline

                        />
                    </div>

                    <FormControl variant="outlined">
                        <h5>Select a category</h5>
                        <Select
                            name="status"
                            {...formik.getFieldProps('category')}
                            error={formik.errors.category && formik.touched.category ? true : false}
                        >
                            <MenuItem value="" >
                                <em>None</em>
                            </MenuItem>
                            {articles.categories ?
                                articles.categories.map((item) => (
                                    <MenuItem key={item._id} value={item._id} >
                                        {item.name}
                                    </MenuItem>
                                ))
                                : null}
                        </Select>
                        {formik.errors.category && formik.touched.category ?
                            <FormHelperText error={true}>
                                {formik.errors.category}
                            </FormHelperText>
                            : null}
                    </FormControl>

                    <Divider className="mt-3 mb-3" />

                    <FormControl variant="outlined">
                        <h5>Select a status</h5>
                        <Select
                            name="status"
                            {...formik.getFieldProps('status')}
                            error={formik.errors.status && formik.touched.status ? true : false}
                        >
                            <MenuItem value="" >
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="draft" >
                                Draft
                            </MenuItem>
                            <MenuItem value="public" >
                                Public
                            </MenuItem>
                        </Select>
                        {formik.errors.status && formik.touched.status ?
                            <FormHelperText error={true}>
                                {formik.errors.status}
                            </FormHelperText>
                            : null}
                    </FormControl>

                    <Divider className="mt-3 mb-3" />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={false}
                    >
                        Edit Article
                    </Button>
                </form >}

        </AdminLayout >

    )
}

export default EditArticle
