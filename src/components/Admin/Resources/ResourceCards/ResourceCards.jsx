

export default function ResourceCards({ resource }) {
  return (
    <div>
      <li>{resource.title}</li>
      <li>{resource.image}</li>
      <li>{resource.url}</li>
      <li>{resource.about}</li>
      <li>{resource.category}</li>
      <li>{resource.notes}</li>
    </div>
  )
}