import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Modal, Select} from "antd";

var columnsHeaders =
  ['#', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday"];

var rowsHeaders = [
  'Slot 1(8:00-8:45)', 'Slot 2(8:55-9:40)', 'Slot 3(9:50-11:35)', 'Slot 4(11:55-12:40)', 'Slot 5(12:50-13:35)'
];

function TimeTable1(props) {
  const [activities, setActivities] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(0);
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [form] = Form.useForm();

  const handleOk = () => {
    const values = form.getFieldsValue();
    console.log("values", values);
  }

  const generateColumns = () => {
    let columns = [];
    columnsHeaders.forEach(item => {
      columns.push(
        <th className="th-style">
          {item}
        </th>)
    })
    return columns;
  }

  const generateTableData = () => {
    let rows = [];
    for (let row = 0; row < rowsHeaders.length; row++) {
      let columns = [];
      for (const col of columnsHeaders) {
        let data;
        if (col === '#') {
          data = rowsHeaders[row];
          columns.push(
            <td bgcolor='#FDFAEB' className='col td-style'>{data}</td>
          );
        } else {
          data = "  "
          for (const [, value] of Object.entries(activities)) {
            if (value["slot"] === row && value["day"] === col) {
              data = value["group"];
            }
          }
          columns.push(
            <td className="col td-style">
              <Button className="table-entry" style={{cursor: "pointer"}} onClick={() => {
                setOpen(true);
                setSlot(row);
                setDay(col);
              }}>{data}</Button>
            </td>
          );
        }
      }
      rows.push(
        <tr className='tr' key={row} className='row'>
          {columns}
        </tr>
      );
    }
    return rows;
  }

  return (
    <div className="w-100">
      <table className='table'>
        <tbody>
        <tr bgcolor='#FDFAEB'>{generateColumns()}</tr>
        {generateTableData()}
        </tbody>
      </table>

      <Modal
        visible={open}
        title="Add subject"
        onCancel={() => setOpen(false)}
        okButtonProps={{form: 'add-timetable-slot', htmlType: 'submit'}}
      >
        <h4 style={{textAlign: "center"}}>{day} + {slot + 1}</h4>
        <Form form={form} name="add-timetable-slot" layout="vertical" onFinish={handleOk}>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{required: true, message: 'Please select subject!'}]}
          >
            <Select placeholder="Select subject..." allowClear onChange={(value) => setSubject(value)}>
              <Select.Option style={{textTransform: "capitalize"}} value="maths">Math</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="literature">Literature</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="foreign language">Foreign
                language</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="chemistry">Chemistry</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="physics">Physics</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="biology">Biology</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="technology">Technology</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="informatics">Informatics</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="civic education">Civic
                Education</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="history">History</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="geography">Geography</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="art">Art</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="physical education">Physical
                Education</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="national defense education">National
                Defense Education</Select.Option>
            </Select>
          </Form.Item>
          {
            subject !== "" && (
              <Form.Item
                label="Teacher"
                name="teacher"
                rules={[{required: true, message: 'Please select teacher!'}]}
              >
                <Select placeholder="Select teacher..." allowClear>
                  <Select.Option style={{textTransform: "capitalize"}} value="maths">Nguyen Van A</Select.Option>
                  <Select.Option style={{textTransform: "capitalize"}} value="literature">Nguyen Van B</Select.Option>

                </Select>
              </Form.Item>
            )
          }
        </Form>
      </Modal>
    </div>
  );

}

export default TimeTable1;