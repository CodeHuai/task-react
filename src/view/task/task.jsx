import React from 'react';
import { Button, Tag, Table, Popconfirm, Modal, Form, DatePicker } from 'antd';
import './task.less';
import moment from 'moment';
import { formatTime } from '../../plugin/index';
import TextArea from 'antd/es/input/TextArea';

const dayjs = require('dayjs');

class Task extends React.Component {
  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      align: 'center',
      width: '8%',
    },
    {
      title: '任务描述',
      dataIndex: 'task',
      ellipsis: true,
      width: '50%',
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      width: '10%',
      render: (text) => (+text === 1 ? '未完成' : '已完成'),
    },
    {
      title: '完成时间',
      dataIndex: 'time',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        let { state, time, complete } = record;
        if (+state === 2) time = complete;
        return formatTime(time);
      },
    },
    {
      title: '操作',
      render: (_, record) => {
        let { id, state } = record;
        return (
          <>
            <Popconfirm
              title='您确定要删除此任务吗？'
              onConfirm={this.handleRemove.bind(null, id)}>
              <Button type='link'>删除</Button>
            </Popconfirm>

            {+state !== 2 ? (
              <Popconfirm
                title='您确把此任务设置为完成吗？'
                onConfirm={this.handleUpdate.bind(null, id)}>
                <Button type='link'>完成</Button>
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];

  // 设置初始的一些状态
  state = {
    data: [],
    tableLoading: false,
    title: '新增任务窗体',
    isModalOpen: false, // modal控制显隐的变量
    ruleForm: {
      task: null,
      time: null,
    },
  };

  handleRemove() {}

  handleUpdate() {}

  //   打开弹框
  add = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  // 关闭弹框
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  // 点击弹框时候确定按钮的时候
  submit = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    let { title, data, isModalOpen, tableLoading } = this.state;
    return (
      <div className='wrapper'>
        <div className='header'>
          <h2>TASK OA 任务管理系统</h2>
          <Button type='primary' onClick={this.add.bind(this)}>
            新增
          </Button>
        </div>

        <div className='table-wrapper'>
          <div className='tag-wrapper'>
            <Tag className='tag-size' color={'#398EEA'}>
              全部
            </Tag>
            <Tag className='tag-size'>未完成</Tag>
            <Tag className='tag-size'>已完成</Tag>
          </div>

          <Table
            columns={this.columns}
            dataSource={data}
            loading={tableLoading}
            pagination={false}
            rowKey='id'
          />

          <Modal
            title={title}
            open={isModalOpen}
            onOk={this.submit}
            onCancel={this.closeModal}>
            <Form layout='vertical' initialValues={{ task: '', time: '' }}>
              <Form.Item
                label='任务描述'
                name='task'
                rules={[
                  {
                    required: true,
                    message: '请输入任务描述',
                  },
                ]}>
                <TextArea
                  row={4}
                  placeholder='任务描述'
                  value={this.state.ruleForm.task}
                  onChange={(ev) => {
                    const value = ev.target.value.trim();

                    this.setState({
                      ruleForm: {
                        ...this.state.ruleForm,
                        task: value,
                      },
                    });
                  }}></TextArea>
              </Form.Item>

              <Form.Item
                label='预期完成时间'
                name='time'
                validateTrigger='onBlur'
                rules={[{ required: true, message: '预期完成时间是必填项' }]}>
                <DatePicker
                  showTime
                  value={this.state.ruleForm.time}
                  onOk={(ev) => {
                    console.log(ev);
                    this.setState({
                      ruleForm: {
                        ...this.state,
                        time: ev,
                      },
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Task;
