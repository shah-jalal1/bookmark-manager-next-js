import React, {useState} from 'react';
import {Button, Col, Row} from "antd";


const CateGoryListCompnent = ({ categoryData}) => {
    const [detailsData, setDetailsData] = useState();

    const handleDetails = (data) => {
        setDetailsData(data);
    }

    return (
        <div className='category-wrapper'>
            <Row>
                <Col md={12}>
                    {
                        categoryData?.map(data =>
                            <div key={Math.random()}>
                                {
                                    data?.category.length !==0 &&
                                    <div>
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
                                }

                            </div>
                        )
                    }

                </Col>

                <Col md={12} style={{width: '330px'}}>
                    {
                        detailsData ?
                            <a rel="noreferrer" href={detailsData?.value?.url} target='_blank'>
                                <div className='category-card' style={{width: '100%'}}>
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