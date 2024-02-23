import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd'

const propTypes = {
	page: PropTypes.number,
	count: PropTypes.number,
	pageSize: PropTypes.number,
};

const defaultProps = {
	page: 1,
	count: 1,
	pageSize: 1,
};

const Paginations = (props) => {
	const { page, count, pageSize, handleChangePage } = props;

	return (
		<Pagination
			current={page}
			total={count}
			// showTotal={(total, range) =>
			// 	`${total} 件中 ${range[0]}～${range[1]} 件`
			// }
			pageSize={pageSize}
			onChange={page => handleChangePage(page, pageSize)}
		/>
	);
};

Paginations.propTypes = propTypes;

Paginations.defaultProps = defaultProps;

export default Paginations;
