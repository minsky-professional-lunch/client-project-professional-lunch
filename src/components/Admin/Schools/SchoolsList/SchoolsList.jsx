import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function SchoolsList() {
  const dispatch = useDispatch();
  const schools = useSelector((store) => store.schoolsReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_SCHOOLS' });
  }, []);

  return (
    <div>
      <h1>Schools</h1>
      <div>
        <ul>
          {schools.map((school) => (
            <div key={school.id}>
              <li>{school.school}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
