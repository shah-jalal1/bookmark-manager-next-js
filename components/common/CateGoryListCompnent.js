import React, {useState} from 'react';
import {Button, Col, Row} from "antd";

const CateGoryListCompnent = ({ categoryData}) => {
// const CateGoryListCompnent = ({categoryList}) => {

    // const [categoryData] = useState(typeof window !== 'undefined' &&
    // localStorage.getItem("bookmarks-data") !== null ?
    //     JSON.parse(localStorage.getItem(('bookmarks-data'))) :
    //     categoryList);
    // const categoryData = typeof window !== 'undefined' &&
    // localStorage.getItem("bookmarks-data") !== null ?
    //     JSON.parse(localStorage.getItem(('bookmarks-data'))) :
    //     categoryList;

    const [detailsData, setDetailsData] = useState();

    // console.log('cateogry list ', categoryList);

    const handleDetails = (data) => {
        console.log('data', data)
        setDetailsData(data);
    }

    return (
        <div className='category-wrapper'>
            <Row>
                <Col md={12}>
                    {
                        categoryData?.map(data =>
                            <div key={Math.random()}>
                                <h3>{data?.categoryListName}</h3>
                                <div className='category-card'>

                                    {
                                        data?.category?.map(value =>
                                            <div key={Math.random()} className='card-item'>
                                                <div>
                                                    <h3>{value?.catName}</h3>
                                                </div>
                                                <div>
                                                    <Button onClick={() => handleDetails({
                                                        value,
                                                        categoryListName: data?.categoryListName
                                                    })}>Details</Button>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        )
                    }

                </Col>

                <Col md={12}>
                    {
                        detailsData ?
                            <a rel="noreferrer" href={detailsData?.value?.url} target='_blank'>
                                <div className='category-card'>
                                    <h3>Title: {detailsData?.value?.catName}</h3>
                                    <h3>url: {detailsData?.value?.url}</h3>
                                    <h3>Category: {detailsData?.categoryListName}</h3>
                                </div>
                            </a>

                            :
                            <div></div>
                    }
                </Col>
            </Row>
        </div>
    );
};

export default CateGoryListCompnent;