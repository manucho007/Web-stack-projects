import React from 'react';
import { Link, Outlet, useSearchParams } from 'react-router-dom';

function BookLayout() {
  const [searchParams, setSearchParams] = useSearchParams({ n: 'a' });
  const number = searchParams.get('n') as string;

  return (
    <>
      <Link to='/books/1'>Book 1</Link>
      <br />
      <Link to='/books/2'>Book 2</Link>
      <br />
      <Link to='/books/new'>New Book</Link>
      <br />
      <Link to={`/books/${number}`}>New Book {number}</Link>
      <br />
      <Outlet />
      <input
        type='string'
        value={number}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchParams({ n: e.target.value })
        }
      />
    </>
  );
}

export default BookLayout;
