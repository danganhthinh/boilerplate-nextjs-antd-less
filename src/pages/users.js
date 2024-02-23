import React from 'react';
import Head from 'src/components/Head';
import Users from 'src/containers/UsersList';
import wrapperStore from 'src/redux';
import { getList } from 'src/redux/actions/users';
import { Pagination } from 'antd';
import PropTypes from "prop-types";
import { useRouter } from 'next/router';

// Define handlePageChange and onShowSizeChange functions here
const handlePageChange = (router, page, pageSize) => {
	console.log(`handlePageChange:: `, pageSize)
	router.push({ pathname: '/users', query: { page, pageSize } });
};

export const getServerSideProps = wrapperStore.getServerSideProps((store) => async (context) => {
	const { page = 1, pageSize = 9 } = context.query;
	const { count, items } = await store.dispatch(await getList({ page, pageSize }));
	return {
		props: {
			items,
			count,
			pageSize: parseInt(pageSize), // Parse pageSize to ensure it's a number
			page: parseInt(page), // Parse page to ensure it's a number
		},
	};
});

const UsersPage = (props) => {
	const { items, count, pageSize, page } = props;
	const router = useRouter();

	const onShowSizeChange = (current, pageSize) => {
		router.push({ pathname: '/users', query: { page: current, pageSize } });
	};

	return (
		<>
			<Head title="Users" />
			<Users {...props} />
			<div
				style={{
					display: 'flex',
					justifyContent: 'end',
					gap: '16px',
				}}
			>
				<Pagination
					total={count}
					pageSize={pageSize}
					onChange={(page, pageSize) => handlePageChange(router, page, pageSize)}
					onShowSizeChange={onShowSizeChange}
					pageSizeOptions={['9', '18', '27', '36']}
				/>
			</div>
		</>
	);
};

UsersPage.propTypes = {
	router: PropTypes.object.isRequired,
};

export default UsersPage;
