import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ResourceCards from './ResourceCards/ResourceCards';

export default function Resources() {
  const dispatch = useDispatch();
  const history = useHistory();
  const resources = useSelector((store) => store.resources);

  useEffect(() => {
    dispatch({ type: 'FETCH_RESOURCES' });
  }, []);
  
  return (
    <div>
      <h1>Mentee Resources</h1>
      <ul>
        {resources.map((resource) => (
          <ResourceCards key={resource.id} resource={resource} />
        ))}
      </ul>
    </div>
  )
}