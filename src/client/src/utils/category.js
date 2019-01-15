const getLabelFromCategory = category => {
  let label
  switch (category) {
    case 'todo':
      label = 'todo'
      break
    case 'in_progress':
      label = 'in progress'
      break
    case 'completed':
      label = 'completed'
      break
    case 'needs_rework':
      label = 'needs rework'
      break
    default:
      label = undefined
  }
  return label
}

export { getLabelFromCategory }
