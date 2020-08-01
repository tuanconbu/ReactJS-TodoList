import React, { useState, useRef } from 'react'
import { Input, Button, Row, Col, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function TodoInput(props) {
    const { onAdd, onSearch, onSave } = props;
    const [addText, setAddText] = useState('');
    const [searchText, setSearchText] = useState('');
    const addInput = useRef();
    const searchInput = useRef();

    //add
    const onAddText = () => {
        console.log("AddText", addText);
        if (!onAdd) return;
        const value = {
            content: addText
        };
        onAdd(value);
        addInput.current.state.value = "";
    }
    const handleAddValueChange = (e) => {
        setAddText(e.target.value)
    }


    //search
    const onSearchText = () => {
        if (!onSearch) return;
        if (!searchText) return;
        onSearch(searchText);
        searchInput.current.state.value = "";
    }
    const handleSearchValueChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <div>
            <Row className="input">
                <Col span={12}>
                    <Input placeholder="Enter..." ref={addInput} onChange={handleAddValueChange} />
                </Col>
                <Col>
                    <Button type="primary" onClick={onAddText}><PlusOutlined /></Button>
                </Col>
                <Col style={{ paddingLeft: 50 }} span={8}>
                    <Search placeholder="Search..." ref={searchInput} onChange={handleSearchValueChange} onSearch={onSearchText} enterButton />
                </Col>
                <Col span={2}>
                    <Button style={{ backgroundColor: '#00c853', color: 'white' }} type="success" onClick={onSave}>Save</Button>
                </Col>
            </Row>
        </div>
    )
}