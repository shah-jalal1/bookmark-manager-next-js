import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import {PlusSquareOutlined} from "@ant-design/icons";
import CateGoryListCompnent from "./common/CateGoryListCompnent";

const categoryList = [
    {
        'categoryListName': 'category A',
        "category":
            [
                {
                    'catName': "javascript",
                    "url": 'https://www.w3schools.com/',
                },
                {
                    'catName': "angular",
                    "url": 'https://www.w3schools.com/',
                },
            ]
    },
    {
        'categoryListName': 'category B',
        "category":
            [
                {
                    'catName': "python",
                    "url": 'https://www.w3schools.com/',
                },
                {
                    'catName': "c++",
                    "url": 'https://www.w3schools.com/',
                },
            ]
    }
]


const HomePage = () => {

    // const [bookmarksData, setBookmarkDate] = useState(typeof window !== 'undefined' &&
    // localStorage.getItem("bookmarks-data") !== null ?
    //     JSON.parse(localStorage.getItem(('bookmarks-data'))) :
    //     categoryList);
    // let bookmarksData = categoryList;


    const [isInitData, setIsInitData] = useState(true);

    const [isAdd, setIsAdd] = useState(false);

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     if ( localStorage.getItem("bookmarks-data") !== null) {
    //         const test =  JSON.parse(localStorage.getItem(('bookmarks-data')));
    //         console.log('test', test)
    //         // console.log('this is use effect', localStorage.getItem("bookmarks-data"));
    //         // bookmarksData =  localStorage.getItem("bookmarks-data");
    //     } else {
    //         // console.log('this is not use effect')
    //     }
    // }, []);

    // if (typeof window !== 'undefined') {
    //     console.log('!!!!!!!!!!sbookmark data',  localStorage.getItem("bookmarks-data"))
    // }
    //
    // console.log('####', bookmarksData)


    const getAllBookmarks = () => {
        setIsAdd(false);
    }

    const addCategory = () => {
        setIsAdd(true);
    }

    const onCancel = () => {
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // console.log('@@@bookmarkdat', bookmarksData)

    const onFinish = async values => {
        let _tempData;
        if (localStorage.getItem("bookmarks-data") === null) {
            console.log('null');
            _tempData = categoryList;
        } else {
            console.log('not null');
            // bookmarksData = JSON.parse(localStorage.getItem(('bookmarks-data')))
            _tempData = JSON.parse(localStorage.getItem(('bookmarks-data')))
        }
        console.log('temp data ', _tempData)

        // localStorage.removeItem("bookmarks-data");

        // bookmarksData = JSON.parse(localStorage.getItem(('bookmarks-data')))

        //
        let _data;

        // _data = bookmarksData?.map(catData => {
        _data = _tempData?.map(catData => {
            if (catData?.categoryListName === values?.categoryListName) {
                catData?.category?.push(values);
            }
            return catData;
        });

        // setBookmarkDate(_data);

        // console.log('bookmarks data.....', _data)

        // JSON.parse(localStorage.getItem('bookmarks-data'));
        //
        localStorage.setItem('bookmarks-data', JSON.stringify(_data));
        //
        //   form.resetFields();
        //
        alert("Successfully added into favourite");
        //
        //   getAllBookmarks();
        //
        //   setIsModalOpen(false);
        //   setIsInitData(false);
    }

    // if (typeof window === 'undefined') {
    //     console.log('////if')
    //     return <></>;
    // } else {
    //     console.log('else....')
    // }


    return (
        <div style={{padding: '50px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2 style={{marginRight: '20px'}}>Bookmark Manager</h2>
                <Button type='primary' onClick={showModal}>Add Bookmark</Button>
            </div>

            {/*    if (typeof window === 'undefined') {*/}
            {/*    return <></>;*/}
            {/*}*/}

            <div>
                {
                    typeof window !== 'undefined' ?

                        <CateGoryListCompnent
                            // categoryList={categoryList}

                            categoryData={

                                // typeof window !== 'undefined' &&
                                // typeof window !== 'undefined' ?
                                localStorage.getItem("bookmarks-data") !== null ?
                                    JSON.parse(localStorage.getItem(('bookmarks-data'))) :
                                    categoryList
                                // :
                                // <></>
                            }
                        />
                        :
                        <></>
                }

            </div>


            <Modal
                title="Add Bookmark"
                open={isModalOpen}
                okButtonProps={{style: {display: 'none'}}}
                cancelButtonProps={{style: {display: 'none'}}}

                onCancel={handleCancel}
            >

                <Form
                    layout='vertical'
                    name="basic"
                    onFinish={onFinish}
                    className="form"
                    form={form}
                >

                    <Row gutter={24}>

                        <Col md={24} xs={24}>
                            <Form.Item
                                // label="Title"
                                name="title"
                                rules={[{required: true, message: 'Please input title'},
                                    {max: 30, message: 'Username must be minimum 30 characters.'}
                                ]}
                            >
                                <Input placeholder='title'/>
                            </Form.Item>
                        </Col>

                        <Col md={24} xs={24}>
                            <Form.Item
                                // label="Title"
                                name="url"
                                rules={[{required: true, message: 'Please input url'}]}
                            >
                                <Input placeholder='Url'/>
                            </Form.Item>
                        </Col>


                        <Col md={24}>
                            <div style={{display: 'flex', width: '100%'}}>
                                <Form.Item
                                    name="categoryListName"
                                    rules={[{required: true, message: 'Please input category'}]}
                                >
                                    <Select disabled={isAdd} style={{width: '420px', marginRight: '10px'}}
                                    >
                                        {
                                            categoryList?.map(data =>
                                                <Select.Option key={Math.random()}
                                                               value={data?.categoryListName}>{data?.categoryListName}</Select.Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Button
                                    icon={<PlusSquareOutlined
                                        style={{
                                            fontSize: "30px",
                                            marginLeft: "0px",
                                            border: 'none'
                                        }}

                                    />}
                                    onClick={addCategory}
                                />

                            </div>
                        </Col>
                        <Col md={24} xs={24}>
                            {
                                isAdd &&
                                <Form.Item
                                    name="catName"
                                    rules={[
                                        {required: true, message: 'Please input catName'},
                                    ]}
                                >
                                    <Input placeholder='New Category Name'/>
                                </Form.Item>
                            }

                        </Col>


                        <Col md={24}>

                            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px'}}>
                                <Button type='primary' onClick={onCancel}>Cancel</Button>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        style={{width: "100%"}}
                                    >
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>

                        </Col>

                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default HomePage;