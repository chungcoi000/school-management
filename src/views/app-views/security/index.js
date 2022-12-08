import {Card, Col, Divider, Form, Row, Spin, Input, Button, notification} from "antd";
import {useState} from "react";
import ApiServices from "../../../services/ApiService";

const Security = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleChangePassword = async () => {
    setLoading(true);
    const {password, currentPassword} = form.getFieldsValue();
    const data = {
      password: password,
      currentPassword: currentPassword
    };
    try {
      const res = await ApiServices.updatePassword(data);
      if (res.status !== 200) {
        notification.error({
          message: res.message
        })
        return setLoading(false);
      } else {
        notification.success({message: res.message});
        form.resetFields();
      }
    } catch (err) {
      notification.error({message: 'Failed to change password'});
    }
    setLoading(false);
  }

  return (
    <div className="change-password">
      <h4 className="mb-4">Update Password</h4>
      <Divider dashed className="mb-4"/>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={14}>
          <Spin
            spinning={loading}
            tip='Changing password...'
          >
            <Card style={{marginTop: "30px"}}>
              <Form
                form={form}
                onFinish={handleChangePassword}
                name="changePasswordForm"
                layout="vertical"
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[{
                    required: true,
                    message: 'Please enter your current password!'
                  }]}
                >
                  <Input.Password/>
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="password"
                  rules={[{
                    required: true,
                    message: 'Please enter your new password!'
                  }]}
                >
                  <Input.Password/>
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={
                    [
                      {
                        required: true,
                        message: 'Please confirm new password!'
                      },
                      ({getFieldValue}) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Password not matched!');
                        },
                      }),
                    ]
                  }
                >
                  <Input.Password/>
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{float: "right"}}>
                  Change password
                </Button>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  )
}

export default Security;