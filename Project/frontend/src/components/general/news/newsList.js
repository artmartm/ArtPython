import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
const NewsList = () => {

    const dispatch = useDispatch();
    const listOfNews = useSelector(state => state.newsReducer.news)

    const styles = {
        div: {
            weight: 700,
            height: 500,
            borderRadius: 50,
            border: '1px solid red'
        }
    }
    return (
        <div>
            <h1>list of news</h1>
            <hr />
            {listOfNews.length > 0 ?
                <div>
                    {listOfNews.map(news =>
                        <div style={styles.div} key={news.id}>
                            <h1><Link to={{ pathname: `/news/${news.id}/`, fromDashboard: false }}>{news.name}</Link></h1>
                        </div>
                    )}
                </div>
                :
                <p>no news</p>
            }
        </div>
    )
}
export default NewsList;




