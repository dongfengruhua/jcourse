import { CourseDetail, Teacher } from '@/models';
import { Card, Descriptions, Spin, Typography } from 'antd';
import { Link } from 'umi';
const { Text, Title } = Typography;

const CourseDetailCard = ({
  course,
  loading,
}: {
  course: CourseDetail;
  loading: boolean;
}) => {
  return (
    <Card
      title={
        loading ? (
          <Spin />
        ) : (
          <Title level={4} style={{ whiteSpace: 'normal' }}>
            {course.name}（{course.main_teacher.name}）
          </Title>
        )
      }
      extra={<Link to="/report">信息有误？</Link>}
      loading={loading}
    >
      <Descriptions column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}>
        <Descriptions.Item label="课号">{course.code}</Descriptions.Item>
        <Descriptions.Item label="学分">{course.credit}</Descriptions.Item>
        <Descriptions.Item label="开课单位">
          {course.department}
        </Descriptions.Item>
        <Descriptions.Item label="授课语言">
          {course.language}
        </Descriptions.Item>
        <Descriptions.Item label="合上教师">
          {course.teacher_group
            .map((item: Teacher) => {
              return item.name;
            })
            .join('，')}
        </Descriptions.Item>
        <Descriptions.Item label="课程类别">
          {course.category}
        </Descriptions.Item>
        <Descriptions.Item label="推荐指数">
          <Text strong>{course.rating.avg?.toFixed(1)}</Text>（
          {course.rating.count}
          人评分）
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CourseDetailCard;
