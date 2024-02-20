/* --------------------------------------------------------
* Author Trần Đức Tiến
* Email tientran0019@gmail.com
* Phone 0972970075
*
* Created: 2020-03-01 17:51:30
*------------------------------------------------------- */

import React from 'react';

import Head from 'src/components/Head';

import Users from 'src/containers/UsersList';

import wrapperStore from 'src/redux';

import { getList } from 'src/redux/actions/users';
import Pagination from "src/components/Pagination";

export const getServerSideProps = wrapperStore.getServerSideProps((store) => async (context) => {
	const {count, items} = await store.dispatch(await getList());
	return {
		props: {
			userList: items,
			count,
		},
	};
});

const UsersPage = (props) => {
	const pagination = {
		page: 1,
		count: 100,
		pageSize: 10,
	}
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
				<Pagination {...pagination}/>
			</div>
		</>
	);
};

UsersPage.propTypes = {
	// classes: PropTypes.object.isRequired,
};

UsersPage.defaultProps = {
	// classes: {},
};

export default UsersPage;
