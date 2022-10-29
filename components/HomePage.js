import React, {useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select} from "antd";
import {PlusSquareOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
// used dynamic for avoid error
const  CateGoryListCompnent = dynamic(() => import('./common/CateGoryListCompnent'), { ssr: false })

const categoryList = [
    {
        'categoryListName': 'Category A',
        "category":
            [
            ]
    },
    {
        'categoryListName': 'Category B',
        "category":
            [
            ]
    },
    {
        'categoryListName': 'Category C',
        "category":
            [
            ]
    }
]


const HomePage = () => {


    const [isAdd, setIsAdd] = useState(false);

    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

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


    const onFinish = async values => {
        let _tempData;
        if (localStorage.getItem("bookmarks-data") === null) {
            _tempData = categoryList;
        } else {
            _tempData = JSON.parse(localStorage.getItem(('bookmarks-data')))
        }

        let _data;
        _data = _tempData?.map(catData => {
            if (catData?.categoryListName === values?.categoryListName) {
                catData?.category?.push(values);
            }
            return catData;
        });

        localStorage.setItem('bookmarks-data', JSON.stringify(_data));

        form.resetFields();

        alert("Successfully added into favourite");

        setIsModalOpen(false);
        setIsAdd(false);
    }

    return (
        <div style={{padding: '50px'}}>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <h2 style={{marginRight: '20px'}}>Bookmark Manager</h2>
                <Button type='primary' danger onClick={showModal}>Add Bookmark</Button>
            </div>
            <div>


                {

                    typeof window !== 'undefined' &&
                    localStorage.getItem("bookmarks-data") !== null ?

                        <CateGoryListCompnent
                            categoryData={
                                JSON.parse(localStorage.getItem(('bookmarks-data')))
                            }

                        />
                        :
                        <><h1>No Data Found</h1></>
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
                                name="url"
                                rules={[
                                    {required: true, message: 'Please input url'},
                                    {
                                        type: "url",
                                        message: "This field must be a valid url."
                                    }
                                ]}
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
                                    <Select placeholder='Category' disabled={isAdd} style={{width: '420px', marginRight: '10px'}}
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
                                        danger
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