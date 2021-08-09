import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticle } from '../../../store/actions/article_actions'
import { clearCurrentArticle } from '../../../store/actions/index'
import Loader from '../../../utils/loader'
import ScoreCard from '../../../utils/scoreCard'
const Article = (props) => {
    const { current } = useSelector(state => state.articles)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getArticle(props.match.params.id))
    }, [dispatch, props.match.params])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentArticle())
        }
    }, [dispatch])

    return (
        <>
            {
                current ? <div className="article_container">
                    <div className="image" style={{ background: `url(https://picsum.photos/1920/1080)` }}>

                    </div>
                    <h1>{current.title}</h1>
                    <div className="mt-3 content">
                        <div dangerouslySetInnerHTML={{ __html: current.content }}>

                        </div>
                        <ScoreCard current={current} />
                    </div>
                </div> : <Loader />
            }

        </>
    )


}

export default Article