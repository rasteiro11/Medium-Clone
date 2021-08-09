import React, { useEffect, useState, useReducer } from 'react'
import AdminLayout from '../../../hoc/adminLayout'
import { Modal, Button, ButtonToolbar, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getPaginateArticles, changeStatusArticle, removeArticle } from '../../../store/actions/article_actions'
import PaginationComponent from './paginate'
import Loader from '../../../utils/loader'


const Articles = (props) => {
    const articles = useSelector(state => state.articles)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const [removeAlert, setRemoveAlert] = useState(false)
    const [toRemove, setToRemove] = useState(null)
    const [loading, setLoading] = useState(true)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { value: '', memory: '' }
    )
    let limit = 5
    let arts = articles.adminArticles

    const editArtsAction = (id) => {
        props.history.push(`/dashboard/articles/edit/${id}`)
    }


    useEffect(() => {
        dispatch(getPaginateArticles())
    }, [dispatch])


    useEffect(() => {
        handleClose()
        if (notifications && notifications.removeArticle) {
            dispatch(getPaginateArticles(arts.page, limit, searchValues.memory))
        }
    }, [dispatch, notifications, arts, limit, searchValues.memory])

    const handleClose = () => setRemoveAlert(false)
    const handleShow = (id = null) => {
        setToRemove(id)
        setRemoveAlert(true)
    }


    const handleStatusChange = (status, _id) => {
        let newStatus = status === 'draft' ? 'public' : 'draft'
        dispatch(changeStatusArticle(newStatus, _id))
    }

    const handleDelete = () => {
        dispatch(removeArticle(toRemove))
    }
    const goToPrevPage = (page) => {
        dispatch(getPaginateArticles(page, limit, searchValues.memory))
    }
    const goToNextPage = (page) => {
        dispatch(getPaginateArticles(page, limit, searchValues.memory))
    }

    const triggerSearch = (e) => {
        e.preventDefault()
        if (searchValues.value !== '') {
            setSearchValues({ memory: searchValues.value })
        }
    }
    const resetSearch = () => {
        setSearchValues({ memory: '', value: '' })
        dispatch(getPaginateArticles(1, limit))
    }

    useEffect(() => {
        setLoading(true)
        dispatch(getPaginateArticles(1, limit, searchValues.memory))
    }, [dispatch, searchValues.memory, limit])

    useEffect(() => {
        setLoading(false)
    }, [articles])


    console.log(searchValues)

    return (
        <AdminLayout section="Articles">
            <div className="articles_table">
                <ButtonToolbar className="mb-3">
                    <ButtonGroup className="mr-2">
                        <LinkContainer to="/dashboard/articles/add">
                            <Button variant="secondary">Add article</Button>
                        </LinkContainer>
                    </ButtonGroup>
                    <form onSubmit={triggerSearch}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="btnGroupAddon2">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                placeholder="Example"
                                value={searchValues.value}
                                onChange={(e) => setSearchValues({ value: e.target.value })}
                            />
                        </InputGroup>
                    </form>
                </ButtonToolbar>

                {loading ?
                    <Loader />
                    :
                    <>
                        <div>
                            {searchValues.memory !== '' ?
                                <p>
                                    Your search for <b>"{searchValues.memory}" </b>
                                    had <b>{articles.adminArticles.totalDocs}</b> result.
                                    <span style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }} onClick={() => resetSearch()}>
                                        RESET SEARCH
                                    </span>
                                </p>

                                : null}
                        </div>

                        <PaginationComponent
                            arts={arts}
                            prev={(page) => goToPrevPage(page)}
                            next={(page) => goToNextPage(page)}
                            handleShow={(id) => handleShow(id)}
                            handleStatusChange={(status, id) => handleStatusChange(status, id)}
                            editArtsAction={(id) => editArtsAction(id)}
                        />
                    </>
                }

                <Modal show={removeAlert} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are You really sure ?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        There is no going back you know
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Ops close this</Button>
                        <Button variant="danger" onClick={() => handleDelete()}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AdminLayout >
    )
}

export default Articles
