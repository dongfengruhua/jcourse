import CourseList from '@/components/course-list';
import config from '@/config';
import { CourseListItem, Pagination, PaginationApiResult } from '@/models';
import { searchCourse } from '@/services/course';
import { Card, Input, PageHeader, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { history } from 'umi';

const { Search } = Input;

const SearchPage = () => {
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);
  const [keyword, setKeyword] = useState<string>(parsed.q ? parsed.q : '');
  const [courses, setCourses] = useState<PaginationApiResult<CourseListItem>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: parsed.page ? parseInt(parsed.page) : 1,
    pageSize: parsed.size ? parseInt(parsed.size) : config.PAGE_SIZE,
  });
  const inputRef = useRef<any>(null);

  const fetchCourses = () => {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    setCourseLoading(true);
    searchCourse(keyword, limit, offset).then((resp) => {
      setCourses(resp);
      setCourseLoading(false);
    });
  };

  useEffect(() => {
    inputRef.current?.focus({ cursor: 'end' });
    fetchCourses();
  }, [history.location.query]);

  const onSearch = (value: string) => {
    if (value.trim() == '') {
      message.info('请输入搜索内容');
      return;
    }
    setPagination({ page: 1, pageSize: config.PAGE_SIZE });
    history.push({
      pathname: history.location.pathname,
      query: { q: keyword },
    });
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
    history.push({
      pathname: history.location.pathname,
      query: { q: keyword, page: page.toString(), size: pageSize.toString() },
    });
  };

  return (
    <PageHeader title={'搜索'} onBack={() => history.goBack()}>
      <Search
        size="large"
        defaultValue={keyword}
        placeholder="搜索课程名/课号/教师名"
        onSearch={onSearch}
        ref={inputRef}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ marginBottom: config.LAYOUT_PADDING }}
      />
      <Card title={'共有' + courses.count + '门课'}>
        <CourseList
          pagination={pagination}
          loading={courseLoading}
          count={courses.count}
          courses={courses.results}
          onPageChange={onPageChange}
          showEnroll={true}
        />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
