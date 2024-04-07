'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const SearchResultsPage = () => {
	const searchParams = useSearchParams();

	console.log(searchParams.get('location'));

	return <div>SearchResultsPage</div>;
};
export default SearchResultsPage;
