import React from 'react';
import {
  Button,
  Tag,
  Table,
  Popconfirm,
  Modal,
  Input,
  Form,
  DatePicker,
} from 'antd';
import './task.less';
import moment from 'moment';

const { TextArea } = Input;
const formatTime = (time) => {
  return time ? moment(time).format('MM-DD HH:mm') : '';
};

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
  data = [];
  tableLoading = false;
  // modal 相关属性设置
  title = '新增任务窗体';
  isModalOpen = false;

  handleRemove() {}

  handleUpdate() {}

  add() {}

  handleOk() {
    this.isModalOpen = false;
  }

  handleCancel() {
    this.isModalOpen = false;
  }

  render() {
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
            dataSource={this.data}
            loading={this.tableLoading}
            pagination={false}
            rowKey='id'
          />

          <Modal
            title='新增任务'
            open={this.isModalOpen}
            onOk={this.handleOk.bind(this)}
            onCancel={this.handleCancel.bind(this)}>
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
                <TextArea row={4} placeholder='任务描述'></TextArea>
              </Form.Item>

              <Form.Item
                label='预期完成时间'
                name='time'
                validateTrigger='onBlur'
                rules={[{ required: true, message: '预期完成时间是必填项' }]}>
                <DatePicker showTime />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Task;
